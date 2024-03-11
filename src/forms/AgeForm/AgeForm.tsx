import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import styles from './AgeForm.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { ActionButton } from '../../components/ui/ActionButton/ActionButton';
import { ageRequestAsync } from '../../store/age/ageAction';

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const names = data.firstName.split(' ');

    dispatch(ageRequestAsync(names));
    reset();
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
                    'Имя должно состоять из латинских букв, разделенных пробелом',
                },
              })}
              id='age-form'
              className={styles.input}
              type='text'
            />
          </div>
        </div>

        {data.length > 0 && (
          <ul className={styles.listAge}>
            {data.map(({ name, age }) => (
              <li key={`${name}-${age}`}>
                Имя: {name}, Возраст: {age}
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
