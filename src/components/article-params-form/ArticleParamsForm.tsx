import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { ArticleStateType, formFields } from 'src/constants/articleProps';
import { useArticleForm } from './hooks/useArticleForm';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';

type ArticleParamsFormProps = {
	initialSettings: ArticleStateType;
	onApply: (settings: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	initialSettings,
	onApply,
	onReset,
}: ArticleParamsFormProps) => {
	const { formState, handleChange, handleSubmit, handleReset } = useArticleForm(
		{
			initialSettings,
			onApply,
			onReset,
		}
	);

	const toggleSidebar = () => {
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.closest(`.${styles.container}`)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text
						as='h3'
						size={31}
						weight={800}
						fontStyle='normal'
						uppercase={true}
						align='left'>
						Задайте параметры
					</Text>
					{formFields.map(({ key, title, options, component, name }) =>
						component === 'select' ? (
							<Select
								key={key}
								selected={formState[key]}
								options={options}
								onChange={(value) => handleChange(key, value)}
								title={title}
							/>
						) : (
							<RadioGroup
								key={key}
								selected={formState[key]}
								options={options}
								onChange={(value) => handleChange(key, value)}
								title={title}
								name={name ?? key}
							/>
						)
					)}
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
