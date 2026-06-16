/* =============================================
   ContactForm.jsx — React Component (Puntos extra)
   Cargado con Babel Standalone en el browser.
   ============================================= */

const { useState } = React;

function ContactForm() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus]     = useState('idle'); // idle | sending | success
    const [errors, setErrors]     = useState({});

    const validate = () => {
        const e = {};
        if (!formData.name.trim())    e.name    = 'El nombre es requerido.';
        if (!formData.email.trim())   e.email   = 'El email es requerido.';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Email invalido.';
        if (!formData.message.trim()) e.message = 'El mensaje es requerido.';
        return e;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1400);
    };

    const handleReset = () => { setStatus('idle'); setErrors({}); };

    if (status === 'success') {
        return (
            React.createElement('div', { className: 'contact-form-wrap text-center py-5' },
                React.createElement('div', { className: 'contact-success-icon', 'aria-hidden': 'true' }, '✓'),
                React.createElement('h3', { style: { color: '#e6edf3', fontFamily: "'Space Grotesk', sans-serif", marginTop: '1rem' } }, 'Mensaje enviado!'),
                React.createElement('p', { style: { color: '#8b949e', marginTop: '.5rem' } }, 'Te respondere lo antes posible.'),
                React.createElement('button', { onClick: handleReset, className: 'cf-submit', style: { maxWidth: '200px', margin: '1.5rem auto 0', display: 'block' } }, 'Enviar otro')
            )
        );
    }

    const field = (id, label, type, name, placeholder, required) =>
        React.createElement('div', { className: type === 'textarea' ? 'col-12' : 'col-md-6' },
            React.createElement('label', { htmlFor: id, className: 'cf-label' }, label + (required ? ' *' : '')),
            type === 'textarea'
                ? React.createElement('textarea', {
                    id, name, value: formData[name], onChange: handleChange,
                    placeholder, rows: 5,
                    className: 'cf-input cf-textarea' + (errors[name] ? ' cf-input--error' : ''),
                    'aria-invalid': !!errors[name],
                    'aria-describedby': errors[name] ? 'err-' + name : undefined
                  })
                : React.createElement('input', {
                    id, type, name, value: formData[name], onChange: handleChange,
                    placeholder, autoComplete: type === 'email' ? 'email' : name,
                    className: 'cf-input' + (errors[name] ? ' cf-input--error' : ''),
                    'aria-invalid': !!errors[name],
                    'aria-describedby': errors[name] ? 'err-' + name : undefined
                  }),
            errors[name] && React.createElement('span', { id: 'err-' + name, className: 'cf-error', role: 'alert' }, errors[name])
        );

    return (
        React.createElement('div', { className: 'contact-form-wrap' },
            React.createElement('form', { onSubmit: handleSubmit, noValidate: true, 'aria-label': 'Formulario de contacto' },
                React.createElement('div', { className: 'row g-3' },
                    field('cf-name',    'Nombre',  'text',     'name',    'Tu nombre',          true),
                    field('cf-email',   'Email',   'email',    'email',   'tu@email.com',        true),
                    field('cf-subject', 'Asunto',  'text',     'subject', 'De que se trata?',    false),
                    field('cf-message', 'Mensaje', 'textarea', 'message', 'Cuentame sobre tu proyecto u oportunidad...', true),
                    React.createElement('div', { className: 'col-12' },
                        React.createElement('button', {
                            type: 'submit',
                            className: 'cf-submit',
                            disabled: status === 'sending',
                            'aria-busy': status === 'sending'
                        },
                            status === 'sending'
                                ? React.createElement(React.Fragment, null,
                                    React.createElement('span', { className: 'cf-spinner', 'aria-hidden': 'true' }),
                                    'Enviando...'
                                  )
                                : 'Enviar mensaje →'
                        )
                    )
                )
            )
        )
    );
}

const contactRoot = document.getElementById('contact-app');
if (contactRoot) {
    ReactDOM.createRoot(contactRoot).render(React.createElement(ContactForm));
}
