import Image from 'next/image'

import UploadFile from '@/components/UploadFile/UploadFile'

const TestPage = () => {
  return (
    <div>
      <Image
        src="https://zlgokxtwk5h4usda.public.blob.vercel-storage.com/novgorod_19_century-9jTxRHbf3GECSLwOjuqD9wsBoBbA8w.jpg"
        alt="Logo"
        width={194}
        height={140}
      />
      <UploadFile />
    </div>
  )
}

export default TestPage
