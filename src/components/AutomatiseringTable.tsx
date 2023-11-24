import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { Link } from 'react-router-dom';

interface Chatbot {
  id: string;
  name: string;
  message: string;
  userId: string;
  temperature: number;
  rateLimiting: number;
  suggestedMessages: string[];
  logo: string;
  userMessageColor: string;
  botMessageColor: string;
}

const AutomatiseringTable: React.FC = () => {
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);

  useEffect(() => {
    // Fetch data from your API using Axios
    axiosInstance
      .get('/bot/chatbots') // Adjust the endpoint accordingly
      .then((response) => {
        console.log('API Response:', response.data);
        setChatbots(response.data.data.chatbots);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Oversigt af Chatbots
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Virksomhed
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">ID</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Beskeder
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Filer
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Afprøv
            </h5>
          </div>
        </div>

        {/* Table rows */}
        {chatbots.map((chatbot) => (
          <div
            key={chatbot.id}
            className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5"
          >
            <div className="flex flex-column items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <img src={chatbot.logo} alt="Brand" width={150} />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {chatbot.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{chatbot.id}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{chatbot.suggestedMessages}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{chatbot.logo}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <Link to={`/automatiseringer/${chatbot.id}`}>
                <button className="flex items-center justify-center px-3 py-1.5 text-sm font-medium text-white bg-black rounded-md hover:bg-blue-600">
                  <span>Opret automatisering til chatbot</span>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutomatiseringTable;
