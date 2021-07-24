import { Layout } from '@components/Layout'
import { AvailableProductPrizeDTO } from '@styles/dto/subscriptions.dto'
import Image from 'next/image'
import { Button } from '@components/Button'
import { ChevronRightIcon } from '@heroicons/react/outline'
import { Container } from '@components/Container'
import Link from 'next/link'

export default function Blog() {
  const avaiblableProductPrize: AvailableProductPrizeDTO[] = [
    {
      productName: 'English Academy',
      productTag: 'englishacademy',
      eligibleUserPrize: 'Sepatu',
      image: 'shoes.jpeg',
    },
    {
      productName: 'Skill Academy',
      productTag: 'skillacademy',
      eligibleUserPrize: 'Tas',
      image: 'bag.jpeg',
    },
    {
      productName: 'Ruangguru',
      productTag: 'ruanggguru',
      eligibleUserPrize: 'Pensil',
      image: 'pencils.jpeg',
    },
  ]

  return (
    <>
      <Layout className="bg-rose-50 border-t">
        <section id="banner" className="my-4">
          <div className="px-32 h-72 w-full rounded-2xl flex flex-row justify-between">
            <div className="mx-10 h-full flex flex-col justify-center">
              <Image
                src="/images/angga-hp.jpg"
                width="300"
                height="900"
                alt="Picture of the author"
              />
            </div>
            <div className="w-700 flex-col">
              <h1 className="text-4xl mb-4 font-bold text-coolGray-900">
                {'Tunggu apa lagi, langganan sekarang dan dapatkan hadiahnya'}
              </h1>
              <p className="text-xl mb-10">
                Belajar mandiri dengan puluhan ribu video belajar beranimasi dan latihan soal. Bisa
                di-download, hemat kuota!
              </p>
              <Link href="/klaim-promo">
                <a>
                  <Button className="rounded-xl w-80 h-14 border p-4 bg-primary text-white-pure flex flex-row justify-between ">
                    Dapatkan Hadiahmu Sekarang
                    <ChevronRightIcon className="h-6 w-6" aria-hidden="true" />
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
      <Container>
        <section className="bg-white-young h-700">
          <div className="text-center pt-10 pb-5">
            <h1 className=" text-3xl font-bold">Hadiah Menarik Sedang Menantimu!</h1>
          </div>
          <div className="w-full">
            <div className="flex flex-row flex-wrap h-full px-20 pt-5">
              {avaiblableProductPrize.map((item: AvailableProductPrizeDTO) => (
                <BlogListItem key={item.productTag} {...item} />
              ))}
            </div>
          </div>
        </section>
      </Container>
    </>
  )
}

function BlogListItem({ productName, eligibleUserPrize, image }: AvailableProductPrizeDTO) {
  return (
    <div className="flex-3 p-3 rounded-2xl">
      <div className="bg-white-pure shadow-md h-400 rounded-2xl hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-99 hover:shad">
        <div className="flex-1 bg-white-pure p-4 rounded-2xl">
          <div className="h-80 flex justify-center rounded-2xl cursor-pointer">
            <Image
              src={`/images/${image}`}
              width="350"
              height="350"
              className="rounded-2xl"
              alt="Picture of the author"
            />
          </div>
          <div className="mt-4">
            <h1 className="text-blueGray-600 text-lg cursor-pointer mt-3">
              <strong>
                Gratis <span className="text-orange-500">{eligibleUserPrize}</span>
              </strong>{' '}
              setiap langganan layanan di {productName}
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}
