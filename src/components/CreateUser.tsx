import { useState } from 'react';
import { fetchAPI } from '../servises/FetchAPI';
import { Formik, Form, Field } from 'formik';
import Select, { components } from 'react-select';
import ReactPhoneInput from 'react-phone-input-2';
import * as yup from 'yup';

const optionsLanguege = [
  { value: 'UA', label: 'Українська' },
  { value: 'EN', label: 'Англійська' },
  { value: 'DE', label: 'Німецька' },
  { value: 'FR', label: 'Французька' },
];

const optionsAddField = [
  { value: 'workplace', label: 'Місце роботи' },
  { value: 'dateofborn', label: 'Дата нарождення' },
  { value: 'age', label: 'Вік' },
  { value: 'profession', label: 'Професія' },
];

const optionsGroup = [
  { value: 'specialize', label: 'Спеціаліст' },
  { value: 'student', label: 'Студент' },
  { value: 'teacher', label: 'Викладач' },
];

const customStyles = {
  option: () => ({}),
  control: () => ({}),
  dropdownIndicator: () => ({}),
  indicatorSeparator: () => ({}),
  placeholder: () => ({}),
  valueContainer: () => ({}),
  menu: () => ({}),
};

const schema = yup.object().shape({
  userName: yup.string().required(),
  lastName: yup.string().required(),
  userPhoneNumber: yup.number(),
  email: yup.string().required(),
  workplace: yup.string(),
  lang: yup.string(),
  profession: yup.string(),
  idRole: yup.string(),
});

interface initialValuesType {
  userName: string,
  lastName: string,
  userPhoneNumber: string,
  email: string,
  workplace: string,
  lang: string,
  profession: string,
  idRole: string,
}

const initialValues = {
  userName:  '',
  lastName: '',
  userPhoneNumber: '',
  email: '',
  workplace: '',
  lang: '',
  profession: 'developer',
  idRole: 'de9b62b2-1ba9-4393-b191-efb19e05b22e',
};



const CustomOption = ( props:any ) => {
  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <div
        className="checked"
        style={{
          border: props.isSelected ? '5px solid #2C7DFA' : '1px solid #2C7DFA',
        }}
      ></div>
      <components.Option isSelected styles={{}} {...props} />
    </div>
  );
};


export const CreateUser: React.FC = () => {
  const [lang, setLang] = useState('');
  const [value, setValue] = useState('');

  const handleSubmit = (values:initialValuesType, { resetForm }:any) => {
    values.lang = lang;
    values.userPhoneNumber = value;
    try {
      fetchAPI(values);
    } catch (error) {
      console.log(error);
    }
    resetForm();
  };

  const getLanguage = (event:any) => {
    setLang(event.value);
  };

  return (
    <div className="background">
      <div className="title">
        <div className="title__lefthand">
          <button className="title__logo"></button>
          <h3 className="title__item">Додати користувача</h3>
        </div>
        <button className="title__cross"></button>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <Form className="user-form">
          <label className="user-form__item">
            <p className="user-form__title">Ім'я</p>
            <Field
              type="text"
              name="userName"
              className="information"
              placeholder="Роман"
              required
            />
          </label>
          <label className="user-form__item">
            <p className="user-form__title">Прізвище</p>
            <Field
              type="text"
              name="lastName"
              className="information"
              placeholder="Омельченко"
              required
            />
          </label>
          <label>
            <p className="user-form__title">Номер телефону</p>
            <ReactPhoneInput
              country={'ua'}
              value={value}
              onChange={setValue}
              buttonStyle={{
                backgroundColor: '#EAF2FF',
                color: '#000000',
                border: '1px solid #EAF2FF',
              }}
              inputStyle={{
                height: 40,
                border: '1px solid #EAF2FF',
                marginBottom: 20,
                width: 276,
              }}
            />
          </label>
          <label className="user-form__item">
            <p className="user-form__title">Email</p>
            <Field
              name="email"
              className="information"
              placeholder="example.com"
              required
            />
          </label>
          <label>
            <p className="user-form__title">Група користувачів</p>
            <Select
              styles={customStyles}
              classNamePrefix="react-select"
              options={optionsGroup}
              placeholder="Оберіть групу"
            />
          </label>
          <label>
            <p className="user-form__title">Мова</p>
            <Select
              components={{ Option: CustomOption }}
              styles={customStyles}
              classNamePrefix="react-select"
              options={optionsLanguege}
              onChange={e => getLanguage(e)}
              placeholder="Оберіть мову"
            />
          </label>
          <label>
            <p className="user-form__title">Додати поле</p>
            <Select
              styles={customStyles}
              classNamePrefix="react-select"
              options={optionsAddField}
              placeholder="Оберіть поле"
            />
          </label>
          <label className="user-form__item">
            <p className="user-form__title">Значення поля</p>
            <Field
              type="text"
              name="workplace"
              className="information"
              placeholder="Введіть значення"
            />
          </label>
          <button type="button" className="add-field">
            Додати поле
          </button>
          <button type="submit" className="add-user">
            Додати користувача
          </button>
        </Form>
      </Formik>
    </div>
  );
};
