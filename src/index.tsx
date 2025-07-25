import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useCallback } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const cssVariableMap: Record<keyof ArticleStateType, string> = {
	fontFamilyOption: '--font-family',
	fontSizeOption: '--font-size',
	fontColor: '--font-color',
	contentWidth: '--container-width',
	backgroundColor: '--bg-color',
};

const mapSettingsToStyles = (settings: ArticleStateType): CSSProperties =>
	Object.entries(cssVariableMap).reduce(
		(styles, [key, cssVar]) => ({
			...styles,
			[cssVar]: settings[key as keyof ArticleStateType].value,
		}),
		{} as CSSProperties
	);

const useArticleStyles = (initialState: ArticleStateType) => {
	const [articleState, setArticleState] = useState(initialState);

	const applySettings = useCallback((settings: ArticleStateType) => {
		setArticleState(settings);
	}, []);

	const resetSettings = useCallback(() => {
		setArticleState(initialState);
	}, [initialState]);

	const formStyles = mapSettingsToStyles(articleState);

	return { formStyles, applySettings, resetSettings };
};

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const { formStyles, applySettings, resetSettings } =
		useArticleStyles(defaultArticleState);

	return (
		<main className={clsx(styles.main)} style={formStyles}>
			<ArticleParamsForm
				initialSettings={defaultArticleState}
				onApply={applySettings}
				onReset={resetSettings}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
