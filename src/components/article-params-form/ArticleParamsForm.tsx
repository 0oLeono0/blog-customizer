import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';

type ArticleParamsFormProps = {
	initialSettings: {
		fontFamilyOption: OptionType;
		fontSizeOption: OptionType;
		fontColor: OptionType;
		contentWidth: OptionType;
		backgroundColor: OptionType;
	};
};

export const ArticleParamsForm = ({
	initialSettings,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedFont, setSelectedFont] = useState(
		initialSettings.fontFamilyOption
	);
	const [selectedSize, setSelectedSize] = useState(
		initialSettings.fontSizeOption
	);
	const [selectedColor, setSelectedColor] = useState(initialSettings.fontColor);
	const [selectedWidth, setSelectedWidth] = useState(
		initialSettings.contentWidth
	);
	const [selectedBackground, setSelectedBackground] = useState(
		initialSettings.backgroundColor
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

	const handleFontChange = (selected: OptionType) => {
		setSelectedFont(selected);
	};

	const handleSizeChange = (selected: OptionType) => {
		setSelectedSize(selected);
	};

	const handleBackgroundChange = (selected: OptionType) => {
		setSelectedBackground(selected);
	};

	const handleContentWidthChange = (selected: OptionType) => {
		setSelectedWidth(selected);
	};

	const handleColorChange = (selected: OptionType) => {
		setSelectedColor(selected);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form}>
					<Text
						as={'h2'}
						size={31}
						weight={800}
						fontStyle='normal'
						uppercase={true}
						align='left'>
						Задайте параметры
					</Text>
					<Select
						selected={selectedFont}
						options={fontFamilyOptions}
						onChange={handleFontChange}
						title='Шрифт'
					/>
					<RadioGroup
						selected={selectedSize}
						options={fontSizeOptions}
						onChange={handleSizeChange}
						title='Размер шрифта'
						name={'Размер шрифта'}
					/>
					<Select
						selected={selectedColor}
						options={fontColors}
						onChange={handleColorChange}
						title='Цвет шрифта'
					/>
					<Select
						selected={selectedBackground}
						options={backgroundColors}
						onChange={handleBackgroundChange}
						title='Цвет фона'
					/>
					<Select
						selected={selectedWidth}
						options={contentWidthArr}
						onChange={handleContentWidthChange}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
