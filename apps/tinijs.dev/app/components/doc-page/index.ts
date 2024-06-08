import {html, css} from 'lit';
import {provide} from '@lit/context';
import {ref, createRef} from 'lit/directives/ref.js';

import {
  Component,
  TiniComponent,
  Input,
  Reactive,
  createComponentLoader,
  type SectionRenderData,
  type OnCreate,
  type OnInit,
  type OnDestroy,
} from '@tinijs/core';
import {UseMeta, type Meta} from '@tinijs/meta';
import {
  UseRouter,
  UseParams,
  ROUTE_CHANGE_EVENT,
  type Router,
  type FragmentItem,
} from '@tinijs/router';
import {Statuses} from '@tinijs/content';

import {
  UI_POST_COMPONENT_REGISTRY,
  UI_POST_COMPONENT_PREFIX,
} from '../../../content/ui-posts/components.js';

import type {
  CategoryService,
  PostService,
  DocCategory,
  DocPost,
  DocPostDetail,
} from '../../services/content.js';

import {AppDocPageMobileToolbarComponent} from './mobile-toolbar.js';
import {AppDocPageMenuComponent} from './menu.js';
import {AppDocPageTOCComponent} from './toc.js';
import {AppDocPageContentComponent} from './content.js';
import {AppDocPageSurroundComponent} from './surround.js';

import {docPageContext, type DocPageContext} from '../../contexts/doc-page.js';

const componentLoader = createComponentLoader(
  {
    ...UI_POST_COMPONENT_REGISTRY,
  },
  {
    prefixes: [UI_POST_COMPONENT_PREFIX],
  }
);

@Component({
  components: [
    AppDocPageMobileToolbarComponent,
    AppDocPageMenuComponent,
    AppDocPageTOCComponent,
    AppDocPageContentComponent,
    AppDocPageSurroundComponent,
  ],
})
export class AppDocPageComponent
  extends TiniComponent
  implements OnCreate, OnInit, OnDestroy
{
  static readonly defaultTagName = 'app-doc-page';
  @UseRouter() readonly router!: Router;
  @UseParams() readonly params!: {slug?: string};
  @UseMeta() readonly meta!: Meta;

  @provide({context: docPageContext})
  @Input()
  context!: DocPageContext;

  @Input() categoryService!: CategoryService;
  @Input() postService!: PostService;

  @Reactive() mobileMenuOpened = false;
  @Reactive() mobileTOCOpened = false;

  private _mobileToolbarRef = createRef<AppDocPageMobileToolbarComponent>();
  private _menuRef = createRef<AppDocPageMenuComponent>();
  private _tocRef = createRef<AppDocPageTOCComponent>();

  onCreate() {
    if (!this.context) throw new Error('context is required');
    if (!this.categoryService) throw new Error('categoryService is required');
    if (!this.postService) throw new Error('postService is required');
    addEventListener(ROUTE_CHANGE_EVENT, this._routeChangeHandler);
    this.addEventListener('click', this._globalClickHandler);
  }

  @Reactive() menuItems?: Array<{
    level: number;
    type: 'category' | 'post';
    item: DocCategory | DocPost;
  }>;
  @Reactive() tocItems: FragmentItem[] = [];
  @Reactive() allPosts?: DocPost[];
  @Reactive() post: SectionRenderData<DocPostDetail>;
  @Reactive() postPrev?: DocPost | null;
  @Reactive() postNext?: DocPost | null;

  async onInit() {
    await this._loadData(this.params.slug);
  }

  onDestroy() {
    removeEventListener(ROUTE_CHANGE_EVENT, this._routeChangeHandler);
    this.removeEventListener('click', this._globalClickHandler);
  }

  async _loadData(postSlug?: string) {
    const loadList = !this.allPosts || !this.menuItems;
    const loadItem = !this.post || this.post.slug !== postSlug;
    const {allPosts, menuItems} = !loadList
      ? {
          allPosts: this.allPosts,
          menuItems: this.menuItems,
        }
      : await this._loadPosts();
    const {post, postPrev, postNext} = !loadItem
      ? {
          post: this.post,
          postPrev: this.postPrev,
          postNext: this.postNext,
        }
      : await this._loadPost(postSlug, allPosts as DocPost[]);
    if (loadList) {
      this.menuItems = menuItems;
      this.allPosts = allPosts;
    }
    if (loadItem) {
      this.post = post;
      this.postPrev = postPrev;
      this.postNext = postNext;
    }
    // update metadata
    this.meta.setPageMetadata({
      title: this.post ? this.post.title : this.context.name,
    });
  }

  private _routeChangeHandler = (e: any) => {
    const {params} = (e as CustomEvent).detail;
    this._loadData(params.slug);
  };

  private _globalClickHandler = (e: MouseEvent) => {
    const eventPaths = e.composedPath();
    const menuTogglerElem = this._mobileToolbarRef.value!.menuTogglerRef.value!;
    const tocTogglerElem = this._mobileToolbarRef.value!.tocTogglerRef.value!;
    // mobile menu
    if (this.mobileMenuOpened) {
      for (const elem of eventPaths) {
        if (elem === this._menuRef.value || elem === menuTogglerElem) break;
        if (elem === this) {
          this.mobileMenuOpened = false;
          break;
        }
      }
    }
    // mobile TOC
    if (this.mobileTOCOpened) {
      for (const elem of eventPaths) {
        if (elem === this._tocRef.value || elem === tocTogglerElem) break;
        if (elem === this) {
          this.mobileTOCOpened = false;
          break;
        }
      }
    }
  };

  private async _loadPosts() {
    let categories: DocCategory[];
    let posts: DocPost[];
    try {
      categories = await this.categoryService.list(
        item => item.status === Statuses.Publish,
        (a, b) => a.order - b.order
      );
      posts = await this.postService.list();
    } catch (error) {
      categories = [];
      posts = [];
    }
    // organize posts by category
    const categoriesRecord = categories
      .sort((a, b) => a.order - b.order)
      .reduce((result, item) => ({...result, [item.slug]: item}), {}) as Record<
      string,
      DocCategory
    >;
    const postsByCategory = Object.keys(categoriesRecord).reduce(
      (result, key) => ({...result, [key]: []}),
      {} as Record<string, DocPost[]>
    );
    for (const post of posts) {
      if (!postsByCategory[post.category]) continue;
      postsByCategory[post.category].push(post);
    }
    // build menu items
    const allPosts: DocPost[] = [];
    const menuItems: Array<{
      level: number;
      type: 'category' | 'post';
      item: DocCategory | DocPost;
    }> = [];
    for (const [categorySlug, posts] of Object.entries(postsByCategory)) {
      const isUncategorized = categorySlug === 'uncategorized';
      const sortedPosts = posts.sort((a, b) => a.order - b.order);
      allPosts.push(...sortedPosts);
      if (!isUncategorized) {
        menuItems.push({
          level: 0,
          type: 'category',
          item: categoriesRecord[categorySlug],
        });
      }
      for (const post of sortedPosts) {
        menuItems.push({
          level: isUncategorized ? 0 : 1,
          type: 'post',
          item: post,
        });
      }
    }
    return {allPosts, menuItems};
  }

  private async _loadPost(postSlug: string | undefined, allPosts: DocPost[]) {
    let post: DocPostDetail | null;
    try {
      if (!postSlug) {
        post = null;
      } else {
        post = await this.postService.getDetail(postSlug);
        if (post?.content) {
          await componentLoader.extractAndLoad([post.content]);
        }
      }
    } catch (error) {
      post = null;
    }
    const postIndex = !post
      ? -1
      : allPosts.findIndex(item => item.slug === post.slug);
    const postIndexPrev = postIndex <= 0 ? -1 : postIndex - 1;
    const postIndexNext = postIndex >= allPosts.length - 1 ? -1 : postIndex + 1;
    const postPrev = postIndexPrev < 0 ? null : allPosts[postIndexPrev];
    const postNext = postIndexNext < 0 ? null : allPosts[postIndexNext];
    return {post, postPrev, postNext};
  }

  protected render() {
    return html`
      <div class="container">
        <app-doc-page-mobile-toolbar
          ${ref(this._mobileToolbarRef)}
          .menuOpened=${this.mobileMenuOpened}
          .tocOpened=${this.mobileTOCOpened}
          @toggleMenu=${() => (this.mobileMenuOpened = !this.mobileMenuOpened)}
          @toggleTOC=${() => (this.mobileTOCOpened = !this.mobileTOCOpened)}
        ></app-doc-page-mobile-toolbar>

        <app-doc-page-menu
          ${ref(this._menuRef)}
          .mobileOpened=${this.mobileMenuOpened}
          .menuItems=${this.menuItems}
          @selectItem=${() => (this.mobileMenuOpened = false)}
        ></app-doc-page-menu>

        <div class="content">
          <app-doc-page-content
            .postSlug=${this.params.slug}
            .post=${this.post}
            @renewFragments=${(e: CustomEvent<FragmentItem[]>) =>
              (this.tocItems = e.detail)}
          ></app-doc-page-content>

          <app-doc-page-surround
            .isFirstPost=${this.params.slug && this.post && !this.postPrev}
            .postPrev=${this.postPrev}
            .postNext=${this.postNext}
          ></app-doc-page-surround>
        </div>

        <app-doc-page-toc
          ${ref(this._tocRef)}
          .mobileOpened=${this.mobileTOCOpened}
          .tocItems=${this.tocItems}
          @selectItem=${() => (this.mobileTOCOpened = false)}
        ></app-doc-page-toc>
      </div>
    `;
  }

  static styles = css`
    .container {
      --toolbar-height: 42px;
      position: relative;
      min-height: calc(var(--page-height) - var(--toolbar-height));
    }

    .content {
      width: 100vw;
      background: var(--color-body);
    }

    @media (min-width: 992px) {
      .container {
        display: grid;
        grid-template-columns: 250px 1fr;
        grid-template-rows: 1fr;
        grid-template-areas: 'menu content';
      }

      app-doc-page-menu {
        grid-area: menu;
      }

      .content {
        grid-area: content;
        width: calc(100vw - 250px);
      }
    }

    @media (min-width: 1200px) {
      .container {
        grid-template-columns: 250px 1fr 250px;
        grid-template-areas: 'menu content toc';
        min-height: var(--page-height);
      }

      app-doc-page-toc {
        grid-area: toc;
      }

      .content {
        width: calc(100vw - 500px);
      }
    }
  `;
}
