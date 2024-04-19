import {type TemplateResult} from 'lit';
import {createContext} from '@lit/context';

export interface DocPageContext {
  name: string;
  path: string;
  githubPath: string;
  homeTemplate: TemplateResult;
}

export const docPageContext = createContext<DocPageContext>(
  Symbol('doc-page-context')
);
