import { Link } from 'react-router-dom'
import Layout from '@/components/layouts'
import ForbiddenIllustration from '@/assets/images/forbidden-illustration.png'

const Forbidden = () => {
  return (
    <Layout>
      <div className='max-w-screen-xl flex flex-col-reverse md:flex-row m-auto justify-center items-center md:mt-6 lg:mt-10 p-4 lg:p-6'>
        <div className='w-7/9 mt-6 md:w-1/2 flex flex-col justify-center items-center'>
          <h1 className='text-[2rem] text-center md:text-left md:text-[3rem] xl:text-[4rem] leading-tight font-semibold mb-[30px]'>
            Không thể truy cập
          </h1>
          <div className='mb-[16px] w-full text-[rgba(106,106,107,1)] text-[1.175rem] leading-normal flex flex-col justify-center '>
            <p>Rất tiếc, bạn không có quyền truy cập vào trang hiện tại.</p>
            <p>Vui lòng điều hướng đến trang trước hoặc trang chủ.</p>
          </div>
          <Link to='/' className='p-[14px] text-normal rounded bg-[#E04141] text-white mt-2'>
            Trở về trang chủ
          </Link>
        </div>
        <img
          src={ForbiddenIllustration}
          alt='Forbidden-Image'
          className='w-5/9 sm:w-1/2 h-full md:h-[500px] object-contain'
        />
      </div>
    </Layout>
  )
}

export default Forbidden