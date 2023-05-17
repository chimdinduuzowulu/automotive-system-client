import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { toast } from 'react-toastify';
import emailjs from 'emailjs-com';

function UsersRequests() {
  let id = sessionStorage.getItem('id');

  const [requests, setrequests] = useState([]);
  const [requestGotten, setrequestGotten] = useState(false);
  //
  useEffect(() => {
    const getRequestData = async () => {
      const mechanicRequests = await axios.get(
        `http://localhost:3001/request/${id}`
      );
      const result = await mechanicRequests.data;
      setrequests(result.data);
      setrequestGotten(true);
    };
    getRequestData();
  }, [requests]);
  const removeRequest = async (id, email) => {
    const mechanicDetails = localStorage.getItem('mechanicData');
    const jsonDetails = JSON.parse(mechanicDetails);
    var templateParams = {
      message: 'Sorry! Your request was declined',
      name: jsonDetails.name,
      fromEmail: jsonDetails.fromEmail,
      toEmail: email,
      subject: 'Mechanic request feedback',
    };
    emailjs
      .send(
        'service_8h0vi58',
        'template_6uoiew1',
        templateParams,
        'rBcveZvRgcn3PZvo0'
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success('Message sent successfully');
        } else {
          toast.error('Error sending message');
        }
      });

    const removePendingRequest = await axios.delete(
      `http://localhost:3001/request/${id}`
    );
    const result = await removePendingRequest.data;
    removePendingRequest.status === 200
      ? toast.success(result?.data?.message)
      : toast.error(result?.data?.message);
  };
  //
  const approveRequest = async (email) => {
    const mechanicDetails = localStorage.getItem('mechanicData');
    const jsonDetails = JSON.parse(mechanicDetails);
    console.log(email);
    var templateParams = {
      message: 'Hello! Your request has been accepted!',
      name: jsonDetails.name,
      fromEmail: jsonDetails.fromEmail,
      toEmail: email,
      subject: 'Mechanic request feedback',
    };
    try {
      emailjs
        .send(
          'service_8h0vi58',
          'template_6uoiew1',
          templateParams,
          'rBcveZvRgcn3PZvo0'
        )
        .then((response) => {
          if (response.status === 200) {
            toast.success('Message sent successfully');
          } else {
            toast.error('Error! sending message!');
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header page='requests' />
      <div className='flex flex-col overflow-x-auto'>
        <div className='sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
            <div className='overflow-auto'>
              {requestGotten ? (
                <table className='min-w-full h-auto text-left text-sm font-light'>
                  <thead className='border-b font-medium dark:border-neutral-500'>
                    <tr>
                      <th scope='col' className='px-6 py-4'>
                        S/N
                      </th>
                      <th scope='col' className='px-6 py-4'>
                        Vehicle Year
                      </th>
                      <th scope='col' className='px-6 py-4'>
                        Petrol Type
                      </th>
                      <th scope='col' className='px-6 py-4'>
                        Transmission
                      </th>
                      <th scope='col' className='px-6 py-4'>
                        Engine Size
                      </th>
                      <th scope='col' className='px-6 py-4'>
                        Horse Power
                      </th>
                      <th scope='col' className='px-6 py-4'>
                        Vehicle Make
                      </th>
                      <th scope='col' className='px-6 py-4'>
                        Car Problem
                      </th>
                      <th scope='col' className='px-6 py-4'>
                        Vehicle Millage
                      </th>
                      <th scope='col' className='px-6 py-4'>
                        Engine Number
                      </th>
                      <th scope='col' className='px-6 py-4'>
                        User Email
                      </th>
                      <th scope='col' className='px-6 py-4'>
                        Full Name
                      </th>
                      <th scope='col' className='px-6 py-4'>
                        Phone
                      </th>
                      <th scope='col' className='px-6 py-4'>
                        Status
                      </th>

                      <th scope='col' className='px-6 py-4'>
                        Resolve
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests?.map((request) => (
                      <tr
                        className='min-w-full border-b dark:border-neutral-500'
                        key={request.id}
                      >
                        <td className='whitespace-nowrap px-6 py-4 font-medium'>
                          {request?.id}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4'>
                          {request?.vehicleYear}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4'>
                          {request.petrolType}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4'>
                          {request.transmission}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4'>
                          {request.engineSize}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4'>
                          {request.horsePower}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4'>
                          {request.vehicleMake}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4'>
                          {request.carProblem}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4'>
                          {request.vehicleMillage}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4'>
                          {request.engineNos}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4'>
                          {request.userEmail}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4'>
                          {request.fullName}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4'>
                          {request.phone}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4'>
                          {request.requestStatus}
                        </td>
                        <td className='whitespace-nowrap px-6 py-4'>
                          <DoneIcon
                            style={{
                              color: 'green',
                              fontWeight: 'bolder',
                              fontSize: '30px',
                            }}
                            onClick={() => approveRequest(request.userEmail)}
                          />
                        </td>
                        <td className='whitespace-nowrap px-6 py-4'>
                          <DeleteIcon
                            style={{
                              color: 'red',
                              fontWeight: 'bolder',
                              fontSize: '30px',
                            }}
                            onClick={() =>
                              removeRequest(request.id, request.userEmail)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className='w-full h-full flex justify-center items-center text-black font-bolder'>
                  NO REQUEST FOUND
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UsersRequests;
