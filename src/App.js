import React, { useRef, useState } from 'react';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import * as Yup from 'yup';

import './App.css';
import Input from './components/Input';

function App() {
  const formRef = useRef(null);
  const mascaraCPF = '999.999.999-999';
  const mascaraCNPJ = '99.999.999/9999.99';
  const [mascaraCpfCnpj, setMascaraCpfCnpj] = useState(mascaraCPF);

  async function submit(data, { reset }) {
    console.log(data)
    // if(data.name === '') {
      // erro
    // }
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Email invalido')
          .required('O email é obrigatorio'),
        password: Yup.string().required('senha obrigatorio'),
      });
      
      await schema.validate(data, {
        abortEarly: false,
      });
      formRef.current.setErrors({});
      reset();
    } catch (err) {
      if(err instanceof Yup.ValidationError) {
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  const valida = (valor) => {
    console.log('>>>>> veio')
    const valorNumerico = valor.replace(/\D/g, '');
    if(valorNumerico.length > 11) return setMascaraCpfCnpj(mascaraCNPJ)
    setMascaraCpfCnpj(mascaraCPF)
  }

  return (
    <div>
      <Form ref={formRef} onSubmit={submit}>
        <Input nome='email' />
        <Input nome='password' />
        <Input nome='cpf/cnpf'
          onChange={(e) => valida(e)}
          mascara={mascaraCpfCnpj}
        />
        <Scope path='endereco'>
          <Input nome='rua' />
          <Input nome='numero' />
        </Scope>


        <button type="submit">enviar</button>
      </Form>
    </div>
  );
}

export default App;
