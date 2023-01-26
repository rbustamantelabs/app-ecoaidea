import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import FormDoc from "../componets/forms/FormDoc"
// import styles from "@/styles/Home.module.css";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>EcoAIDea</title>
        <meta name="description" content="Eco-ideas de startups a un click" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="main-page-wrapper">
          <div className="hero-banner-three">
            <div className="container">
              <div className="row">
                <div className="col-xl-9 col-lg-11 col-md-8 m-auto">
                  <h1 className="font-rubik">Genera tu Idea de Negocio.</h1>
                </div>

                <div className="col-xl-8 col-lg-9 m-auto">
                  <p className="sub-text font-rubik">
                    EcoAIDea te ayudará a personalizar tu propia idea de negocio
                  </p>
                </div>

                <div className="search-filter-form">
                  <FormDoc></FormDoc>  
                </div>

                <Image
                  src="images/assets/ils_09.svg"
                  alt="illustration"
                  className="illustration"
                  width={1174}
                  height={567}
                  priority
                />
              </div>
            </div>

            {/* <Image src="images/shape/68.svg" alt="shape" className="shapes shape-one" width={32} height={32} /> */}
            <Image
              src="images/shape/68.svg"
              alt="shape"
              className="shapes shape-one"
              width={32}
              height={33}
              priority
            />
            <Image
              src="images/shape/69.svg"
              alt="shape"
              className="shapes shape-two"
              width={24}
              height={34}
              priority
            />
            <Image
              src="images/shape/70.svg"
              alt="shape"
              className="shapes shape-three"
              width={26}
              height={33}
              priority
            />
            <Image
              src="images/shape/71.svg"
              alt="shape"
              className="shapes shape-four"
              width={21}
              height={21}
              priority
            />
            <Image
              src="images/shape/72.svg"
              alt="shape"
              className="shapes shape-five"
              width={248}
              height={61}
              priority
            />
            <Image
              src="images/shape/73.svg"
              alt="shape"
              className="shapes shape-six"
              width={224}
              height={55}
              priority
            />
            <Image
              src="images/shape/74.svg"
              alt="shape"
              className="shapes shape-seven"
              width={33}
              height={8}
              priority
            />
            <Image
              src="images/shape/75.svg"
              alt="shape"
              className="shapes shape-eight"
              width={22}
              height={23}
              priority
            />
            <Image
              src="images/shape/76.svg"
              alt="shape"
              className="shapes shape-nine"
              width={19}
              height={29}
              priority
            />
            <Image
              src="images/shape/77.svg"
              alt="shape"
              className="shapes shape-ten"
              width={49}
              height={50}
              priority
            />
          </div>
        </div>
      </main>
    </>
  );
}
