import Logo from "../assets/icons/logo.png"; 
import Socials from "../assets/images/HomePage/socials.png"; 

const Footer = () => {
  return (
    <footer className="w-full bg-[#1E293B]">
      <div className="max-w-[1280px] mx-auto flex justify-between items-start gap-[75px] px-8 py-16">
        <div className="flex flex-col gap-4 w-[416px]">
          <div className="flex items-center gap-2">
            <img
              src={Logo}
              alt="Byway Logo"
              className="w-10 h-10 object-contain"
            />
            <span className="text-[20px] font-semibold text-white">Byway</span>
          </div>
          <p className="text-[14px] font-normal leading-[21px] text-gray-300">
            Empowering learners through accessible and engaging online education.
            Byway is a leading online learning platform dedicated to providing
            high-quality, flexible, and affordable educational experiences.
          </p>
        </div>

        <div className="flex flex-col gap-2 w-[98px]">
          <h5 className="text-[18px] font-semibold leading-[29px] text-gray-100">
            Get Help
          </h5>
          <p className="text-[14px] font-medium leading-[22px] text-gray-300 cursor-pointer">
            Contact Us
          </p>
          <p className="text-[14px] font-medium leading-[22px] text-gray-300 cursor-pointer">
            Latest Articles
          </p>
          <p className="text-[14px] font-medium leading-[22px] text-gray-300 cursor-pointer">
            FAQ
          </p>
        </div>

        <div className="flex flex-col gap-2 w-[91px]">
          <h5 className="text-[18px] font-semibold leading-[29px] text-gray-100">
            Programs
          </h5>
          <p className="text-[14px] font-medium leading-[22px] text-gray-300 cursor-pointer">
            Art & Design
          </p>
          <p className="text-[14px] font-medium leading-[22px] text-gray-300 cursor-pointer">
            Business
          </p>
          <p className="text-[14px] font-medium leading-[22px] text-gray-300 cursor-pointer">
            IT & Software
          </p>
          <p className="text-[14px] font-medium leading-[22px] text-gray-300 cursor-pointer">
            Languages
          </p>
          <p className="text-[14px] font-medium leading-[22px] text-gray-300 cursor-pointer">
            Programming
          </p>
        </div>

        <div className="flex flex-col gap-6 w-[309px]">
          <div className="flex flex-col gap-2">
            <h5 className="text-[18px] font-semibold leading-[29px] text-gray-100">
              Contact Us
            </h5>
            <p className="text-[14px] font-medium leading-[22px] text-gray-300">
              Address: 123 Main Street, Anytown, CA 12345
            </p>
            <p className="text-[14px] font-medium leading-[22px] text-gray-300">
              Tel: +(123) 456-7890
            </p>
            <p className="text-[14px] font-medium leading-[22px] text-gray-300">
              Mail: bywayedu@webkul.in
            </p>
          </div>

          <img
            src={Socials}
            alt="Social Icons"
            className="w-[296px] h-[40px] object-contain"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
