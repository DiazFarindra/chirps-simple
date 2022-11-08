import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head, usePage } from '@inertiajs/inertia-react';
import Chirp from '@/Components/Chirp';

export default function Index({ auth, chirps }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: '',
    });

    const { flash } = usePage().props;

    const submit = (e) => {
        e.preventDefault();
        post(route('chirps.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Chirps" />

            <div className="max-w-2xl p-4 mx-auto sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <textarea
                        value={data.message}
                        placeholder="What's on your mind?"
                        className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        onChange={e => setData('message', e.target.value)}
                    ></textarea>
                    <InputError message={errors.message} className="mt-2" />
                    <div className="flex items-center mt-4">
                        <PrimaryButton className="mr-3" processing={processing}>Chirp</PrimaryButton>
                        {flash.success && (
                            <span className="font-semibold text-green-400">✅ {flash.success}</span>
                        )}
                    </div>
                </form>

                <div className="mt-6 bg-white divide-y rounded-lg shadow-sm">
                    {chirps.map(chirp =>
                        <Chirp key={chirp.id} chirp={chirp} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
