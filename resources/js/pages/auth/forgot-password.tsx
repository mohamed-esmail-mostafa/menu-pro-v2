import React from 'react';
import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { email } from '@/routes/password';
import useImport from '@/hooks/use-import';

export default function ForgotPassword({ status }: { status?: string }) {
    const { t } = useImport();

    return (
        <>
            <Head title={t('auth.forgot-password')} />

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-emerald-600">
                    {status}
                </div>
            )}

            <div className="space-y-6">
                <Form {...email.form()}>
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="email">{t('auth.email')}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    autoFocus
                                    placeholder={t('auth.enter-email')}
                                />
                                <InputError message={errors.email} />
                            </div>

                            <Button
                                className="w-full font-semibold"
                                disabled={processing}
                                data-test="email-password-reset-link-button"
                            >
                                {processing && <Spinner className="mr-2" />}
                                {t('auth.email-password-reset-link')}
                            </Button>
                        </>
                    )}
                </Form>

                <div className="text-center text-sm text-muted-foreground">
                    <TextLink href={login()} className="font-semibold text-primary">
                        {t('auth.login')}
                    </TextLink>
                </div>
            </div>
        </>
    );
}

ForgotPassword.layout = {
    title: 'auth.forgot-password',
    description: 'auth.reset-password-description',
};
