import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRef } from 'react';

import styles from './AgeForm.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { ActionButton } from '../../components/ui/ActionButton/ActionButton';
import { ageRequestAsync } from '../../store/age/ageAction';
import { ageSlice } from '../../store/age/ageSlice';

export const AgeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.age.data);
  const error = useAppSelector((state) => state.age.error);
  const prevNames = useRef<string[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const names = data.firstName.split(' ');

    if (prevNames.current.join('') !== names.join('')) {
      const controller = new AbortController();

      abortControllerRef.current = controller;

      dispatch(ageRequestAsync({ names, signal: controller.signal }));
      prevNames.current = names;
    } else {
      dispatch(ageSlice.actions.setError('Повтор имен'));
    }

    reset();
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setTimeout(() => {
      const currentInputValue = event.target.value;

      if (inputValue === currentInputValue) {
        handleSubmit(onSubmit)();
      }
    }, 3000);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Оценить возраст человека по имени</h3>
      <h5 className={styles.subtitle}>
        Можно вводить сразу несколько имен, но не больше 10
      </h5>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.wrapper}>
          <label className={styles.label}>Имя</label>

          <div className={styles.inputWrapper}>
            {errors.firstName?.message && (
              <span className={styles.error}>
                {errors.firstName.message.toString()}
              </span>
            )}
            {error && <span className={styles.error}>{error}</span>}
            <input
              {...register('firstName', {
                required: 'Введите имя',
                pattern: {
                  value: /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/,
                  message:
                    'Имя должно содержать только латинские буквы и пробелы',
                },
              })}
              id='age-form'
              className={styles.input}
              type='text'
              onInput={handleInput}
            />
          </div>
        </div>

        {data.length > 0 && (
          <ul className={styles.listAge}>
            {data.map(({ name, age }) => (
              <li key={`${name}-${age}`}>
                Имя: {name}, Возраст: {age ?? 'не определен'}
              </li>
            ))}
          </ul>
        )}

        <div className={styles.buttonWrapper}>
          <ActionButton text='Отправить' type='submit' />
        </div>
      </form>
    </div>
  );
};
