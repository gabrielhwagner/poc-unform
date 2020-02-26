import React, { useEffect, useRef } from 'react'
import { useField } from '@unform/core'
import ReactInputMask from 'react-input-mask';

export default function Input({ nome, mascara, onChange }) {
  const { fieldName, registerField, error } = useField(nome);
  const inputRef = useRef(null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref, value) {
        ref.setInputValue('');
      },
      clearValue(ref) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);
  
  return (
    <div>
      <span style={{display: 'block', marginTop: '15px'}}>{nome}</span>
      {
        mascara ? (
          <ReactInputMask
            ref={inputRef}
            name={nome}
            mask={mascara}
            maskChar={null}
            onChange={onChange ? (e) => onChange(e.target.value) : null}
          />
        ) : (
          <input
            ref={inputRef}
            name={nome}
          />
        )
      }
      {
        error && (
          <span style={{display: 'block', marginBottom: '10px', color: 'red'}}>
            {error}
          </span>
        )
      }
    </div>
  )
}
