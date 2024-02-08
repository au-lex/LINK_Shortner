import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Hero = () => {
    const [url, setUrl] = useState('');
    const [shortUrls, setShortUrls] = useState([]);
    const [loading, setLoading] = useState(false);

    const isValidURL = (str) => {
        const pattern = new RegExp('^(https?:\\/\\/)?' +
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
            '((\\d{1,3}\\.){3}\\d{1,3}))' +
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
            '(\\?[;&a-z\\d%_.~+=-]*)?' +
            '(\\#[-a-z\\d_]*)?$', 'i');
        return !!pattern.test(str);
    };

    const shortenUrl = async () => {
        if (!isValidURL(url)) {
            toast.error("Please enter a valid URL.");
            return;
        }

        const accessToken = '1158dfc6c4b50a1919db87f5b65c67d1d6d6b854';

        setLoading(true);
        try {
            const response = await fetch(`https://api-ssl.bitly.com/v4/shorten`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ long_url: url }),
            });

            if (response.ok) {
                const data = await response.json();
                const newShortUrl = {
                    original: url,
                    shortlink: data.link
                };
                setShortUrls(prevUrls => [...prevUrls, newShortUrl]);
                setUrl('');
            } else {
                throw new Error('Failed to shorten the URL. Please try again.');
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    function handleCopy(copiedText) {
        navigator.clipboard.writeText(copiedText);
        toast.success("URL copied to clipboard!");
    }

    return (
        <>
            <ToastContainer />
            <main>
                <section className="grLinks flex justify-center px-[1.4rem] font mt-28 lg:px-72">
                    <div className="grLinksContainer w-full h-[10rem] bg-bg rounded-xl lg:px-20 lg:pt-10">
                        <section className="inputContainer flex justify-center flex-col px-4 lg:flex lg:flex-row lg:space-x-10 ">
                            <input
                                value={url}
                                type="Url"
                                onChange={e => setUrl(e.target.value)}
                                placeholder='shorten a link here....'
                                className='py-3 outline-0 px-4 my-[1.5rem] rounded-lg lg:w-full'
                            />
                            <section className='lg:mt-6'>
                                <button
                                    onClick={shortenUrl}
                                    className='w-full bg-btn b-red-700 py-2 cursor-pointer block rounded-lg text-slate-100 font-semibold text-[1.2rem] lg:w-[15rem] lg:h-[3rem]'
                                    disabled={loading}
                                >
                                    {loading ? 'Shortening...' : 'Shorten it!'}
                                </button>
                            </section>
                        </section>
                    </div>
                </section>
                <section className="GR bg-slate-200 ">
                    {shortUrls.map((link, indx) =>
                        <section key={indx} className="outputLinks flex justify-center px-[1.4rem] mt-10 flex-col lg:flex-row ">
                            <div className="grLinksContainer w-full h-[11rem] bg-slate-100 rounded-xl my-[2rem] lg:w-[68%] lg:h-[5rem] lg:pt-4">
                                <section className="inputContainer overflow-hidden flex justify-center flex-col lg:flex lg:flex-row lg:space-x-10 lg:justify-between">
                                    <a
                                        href={link.original}
                                        target='blank'
                                        className='border-b-2 leading-10 font-semibold text-bg text-[12px] px-4 whitespace-nowrap overflow-hidden block py-2 lg:border-b-0'
                                    >
                                        {link.original}
                                    </a>
                                    <div className="btn px-4 lg:flex lg:space-x-10">
                                        <a
                                            href={link.shortlink}
                                            target='blank'
                                            className='leading-10 font-semibold text-btn text-[12px] pl-4 block py-2'
                                        >
                                            {link.shortlink}
                                        </a>
                                        <button
                                            onClick={() => handleCopy(link.shortlink)}
                                            className='bg-btn block w-full py-2 cursor-pointer rounded-lg text-slate-100 font-semibold text-[1rem] lg:w-[10rem] lg:h-[3rem]'
                                        >
                                            Copy
                                        </button>
                                    </div>
                                </section>
                            </div>
                        </section>
                    )}
                </section>
                <article className='mt-10 lg:pt-20 '>
                    <section className='text-center '>
                        <h4 className='text-[2rem] capitalize font-bold'>Advanced statistics</h4>
                        <p className='text-[19px] my-4 lg:hidden'>
                            Track how your links are performing<br />
                            across the web with our advanced <br />
                            statistics dashboard
                        </p>
                        <p className='text-[19px] my-4 hidden lg:block'>
                            Track how your links are performing
                            across the web with our advanced <br />
                            statistics dashboard
                        </p>
                    </section>
                </article>
            </main>
        </>
    )
}

export default Hero;
