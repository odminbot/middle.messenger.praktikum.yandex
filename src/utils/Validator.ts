interface IvPattern {
    message: string;
    rule: RegExp;
  }

  const rulesForFields: Record<string, IvPattern> = {
    login: {
      message: 'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).',
      rule: /^(?=.*?([a-zA-Z]|-|_))(\w|-|_){3,20}$/,
    },
    email: {
      message: 'Латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.',
      rule: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    first_name: {
      message: 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).',
      rule: /^[А-ЯЁA-Z]{1}([а-яёa-z]|-[А-ЯЁA-Zа-яёa-z]{1}[а-яёa-z])*$/,
    },
    second_name: {
      message: 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис).',
      rule: /^[А-ЯЁA-Z]{1}([а-яёa-z]|-[А-ЯЁA-Zа-яёa-z]{1}[а-яёa-z])*$/,
    },
    phone: {
      message: 'От 10 до 15 символов, состоит из цифр, может начинается с плюса.',
      rule: /^\+?\d{10,15}$/,
    },
    password: {
      message: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
      rule: /^(?=.*?([A-Z]))(?=.*?\d)(\w|-|_){8,40}$/,
    },
    oldPassword: {
      message: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
      rule: /^(?=.*?([A-Z]))(?=.*?\d)(\w|-|_){8,40}$/,
    },
    repeatPassword: {
      message: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.',
      rule: /^(?=.*?([A-Z]))(?=.*?\d)(\w|-|_){8,40}$/,
    },
    message: {
      message: 'Не должно быть пустым.',
      rule: /[\s\S]+/,
    },
  };
  
  const validation = (event: Event): void => {
    
    const target = event.target as HTMLInputElement;

    if (!rulesForFields[target.name]) { return; }

    const parent = target.parentElement;
    const error = parent?.querySelector('.error');
    const {rule} = rulesForFields[target.name];
    const isTrue: boolean = rule.test(target.value);
    
    if (isTrue) {
      error!.textContent = '';
    } else {
      error!.textContent = rulesForFields[target.name].message;
    }
  };
  
  const focusin = (event: Event): void => {
    validation(event);
  };
  
  const focusout = (event: Event): void => {
    validation(event);
  };
  
  const submit = (event: Event): void => {
    event.preventDefault();
    const inputs = document.getElementsByTagName('input');
    const isTrue: boolean = Array.from(inputs).every((element: Element) => {
        
        const inputElement = element as HTMLInputElement;
        const { rule } = rulesForFields[inputElement.name];
        
        if (!rule.test(inputElement.value)) {
            inputElement.value = '';
        }

        return rule.test(inputElement.value);
    });
  
    if (isTrue) {
      const data: Record<string, string> = {};
      Array.from(inputs).forEach((input) => {
        data[input.name] = input.value;
      });
      console.log(data);
    }
  };
  
  export { focusin, focusout, submit };
