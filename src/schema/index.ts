export * from './auth';
export * from './dashboard';

export { createLoginSchema } from './auth/login-form.schema';
export { createRegisterSchema } from './auth/register-form.schema';
export { createForgotPasswordSchema } from './auth/forgot-password-form.schema';
export { createEventFormSchema } from './dashboard/event/create-event-form.schema';
export { createSimpleEventFormSchema, type SimpleCreateEventFormValues } from './dashboard/event/simple-create-event-form.schema';
export { createEventConfigFormSchema, type EventConfigFormValues } from './dashboard/event/config-event-form.schema';