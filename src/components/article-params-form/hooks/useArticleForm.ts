import { useCallback, useState } from 'react';
import { ArticleStateType, OptionType } from 'src/constants/articleProps';

type UseArticleFormProps = {
	initialSettings: ArticleStateType;
	onApply: (settings: ArticleStateType) => void;
	onReset: () => void;
};

export const useArticleForm = ({
	initialSettings,
	onApply,
	onReset,
}: UseArticleFormProps) => {
	const [formState, setFormState] = useState<ArticleStateType>(initialSettings);

	const handleChange = useCallback(
		(key: keyof ArticleStateType, value: OptionType) => {
			setFormState((prev) => ({ ...prev, [key]: value }));
		},
		[]
	);

	const handleSubmit = useCallback(
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			onApply(formState);
		},
		[formState, onApply]
	);

	const handleReset = useCallback(() => {
		setFormState(initialSettings);
		onReset();
	}, [initialSettings, onReset]);

	return { formState, handleChange, handleSubmit, handleReset };
};
