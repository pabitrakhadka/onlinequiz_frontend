import DashLayout from '@/Components/DashLayout'
import IconComp from '@/Components/IconComp'
import { Table, Thead, Th, Td, Tbody, Tr } from '@/Components/TableComp'
import React from 'react'

import { Trash } from 'iconsax-react';

const userScrore = () => {


    //delete operation
    const handleDelete = (id) => {
        try {
            console.log(id);
        } catch (error) {

        }
    }
    return (
        <DashLayout>
            <div>User Score</div>

            <div>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>
                                Name
                            </Th>
                            <Th>
                                Email
                            </Th>
                            <Th>
                                Score
                            </Th>
                            <Th>
                                Attemp Total Quiz
                            </Th>
                            <Th>
                                Action
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>Ram Kumar Sharma</Td>
                            <Td>ram@gmail.com</Td>
                            <Td>500</Td>
                            <Td>12</Td>
                            <Td><IconComp onClick={() => handleDelete(1)} icon={<Trash color='white' />}></IconComp></Td>
                        </Tr>
                    </Tbody>
                </Table>
            </div>
        </DashLayout>
    )
}

export default userScrore