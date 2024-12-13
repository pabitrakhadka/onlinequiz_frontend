import DashLayout from '@/Components/DashLayout';
import { deleteContact, getContactData } from '@/functions/contact';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { fullName } from '@/services/fullName';

import IconComp from '@/Components/IconComp';
import { Trash, EmptyWalletTick } from 'iconsax-react';
import { toast } from 'react-toastify';

const Loders = dynamic(() => import("@/Components/Loders"), { ssr: false });

const Message = () => {
    const [contactData, setContactData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const loadData = async () => {
        try {
            const res = await getContactData('category=all');
            if (res.status === 200) {
                setContactData(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching contact data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);


    //handle delete message
    const handleDelete = async (id) => {
        try {
            const res = await deleteContact(`id=${id}`);
            if (res.status === 200) {
                toast.success(`${res.data.message}`);

                setContactData(contactData.filter((item) => item.id !== id));
            } else {
                toast.error(`${res.data.message}`)
            }

        } catch (error) {
            console.log("error", error);
        }
    }
    const handleMail = (email) => {
        try {
            const mailto = `mailto:${email}`;
            window.location.href = mailto; // Redirects to the mail client
        } catch (error) {
            console.log("Error opening mailbox:", error);
        }
    };

    return (
        <DashLayout>
            <div>
                <h1>Contact Messages</h1>
                <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {isLoading ? (
                            <tr>
                                <td colSpan={3} className="text-center py-4">
                                    <Loders />
                                </td>
                            </tr>
                        ) : contactData && contactData.length > 0 ? (
                            contactData.map((item) => (
                                <tr key={item.id} className="bg-white hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{fullName(item.firstName, item.lastName)}</td>
                                    <td className="px-6 py-4">{item.email}</td>
                                    <td className="px-6 py-4">{item.message}</td>
                                    <td className="px-6 py-4"><IconComp onClick={() => handleDelete(item.id)} className='bg-red-400 text-white' icon={<Trash
                                        size="32"
                                        color="white"
                                        variant='Bold'
                                    />} /></td>
                                    <td className="px-6 py-4"><IconComp onClick={() => handleMail(item.email)} icon={<EmptyWalletTick />} /></td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="text-center py-4">
                                    No data found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </DashLayout>
    );
};

export default Message;
