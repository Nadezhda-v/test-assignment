import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';

import styles from './CatFactForm.module.scss';
import { factRequestAsync } from '../../store/fact/factAction';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { ActionButton } from '../../components/ui/ActionButton/ActionButton';

export const CatFactForm = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const fact = useAppSelector((state) => state.fact.fact);

  const [factState, setFactState] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isInitialFactSet = useRef<boolean>(false);

  useEffect(() => {
    setFactState(fact);
    isInitialFactSet.current = false;
  }, [fact]);

  useEffect(() => {
    if (factState && textareaRef.current && !isInitialFactSet.current) {
      // Находим индекс первого пробела в строке факта
      const firstSpaceIndex = factState.indexOf(' ');

      if (firstSpaceIndex !== -1) {
        textareaRef.current.focus();

        // Устанавливаем курсор после первого слова
        textareaRef.current.setSelectionRange(firstSpaceIndex, firstSpaceIndex);
      }

      textareaRef.current.scrollTop = 0;

      // Флаг, чтобы повторно не устанавливать курсор при редактировании
      isInitialFactSet.current = true;
    }
  }, [factState]);

  const onSubmit = () => {
    dispatch(factRequestAsync());
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFactState(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Хотите узнать интересный факт о котах?</h3>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.wrapper}>
          <textarea
            id='cat-fact'
            className={styles.textarea}
            {...register('fact')}
            value={factState}
            onChange={handleChange}
            ref={textareaRef}
          />
        </div>

        <div className={styles.buttonWrapper}>
          <ActionButton text='Получить факт!' type='submit' />
        </div>
      </form>
    </div>
  );
};
