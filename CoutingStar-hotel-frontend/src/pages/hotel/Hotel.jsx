import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import RoomList from "../../components/roomList/RoomList";
import Register from "../../components/register/Register";
import Rating from "../../components/rating/Rating";

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);

  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  return (
    <div>
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        {ratingOpen && <Rating onClose={() => setRatingOpen(false)} />}
        <div className="hotelWrapper">
          <button className="bookNow">Hãy đặt ngay!</button>
          <h1 className="hotelTitle">Khách Sạn Mỹ Hạnh</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>688/91 Quang Trung, Gò Vấp</span>
          </div>
          <span className="hotelDistance">Tại thành phố - Hồ Chí Minh</span>
          <span className="hotelRating">
            <p>
              Đây là khách sạn với số sao là <FontAwesomeIcon icon={faStar} />{" "}
              5/5
            </p>
            <p className="viewHotelRating" onClick={() => setRatingOpen(true)}>Xem đánh giá</p>
          </span>
          <span className="hotelPriceHighlight">
            Hãy đặt ngay để tận hưởng khoảng khắc tuyệt vời tại khách sạn
          </span>
          <div className="hotelImages">
            {photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo.src}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div>

          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Nằm ở khu du lịch</h1>
              <p className="hotelDesc">
                Nằm cách Cổng St. Florian ở Krakow 5 phút đi bộ, Tower Street
                Apartments cung cấp chỗ ở được trang bị máy điều hòa và wifi
                miễn phí. Các căn hộ có sàn gỗ cứng và có bếp nhỏ đầy đủ tiện
                nghi với lò vi sóng, TV màn hình phẳng, và phòng tắm riêng với
                vòi sen và máy sấy tóc. Một chiếc tủ lạnh là cũng được cung cấp,
                cũng như một ấm trà điện và một máy pha cà phê. máy móc. Các
                điểm tham quan nổi tiếng gần căn hộ bao gồm Hội trường Vải,
                Quảng trường Chợ Chính và Tháp Tòa thị chính. Gần nhất sân bay
                là John Paul II International Kraków–Balice, 16,1 km từ Tower
                Street Apartments và nơi lưu trú cung cấp dịch vụ trả phí dịch
                vụ đưa đón sân bay.
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Nơi tuyệt vời để thuê!</h1>
              <span>
                Nằm tại thành phố Hồ Chí Minh, khách sạn này có số điểm là 9.8!
              </span>
              <h2>
                <b>từ $945</b> (1 đêm)
              </h2>
              <button>Đặt phòng ngay!</button>
            </div>
          </div>
          <RoomList />
        </div>
        <Register />
      </div>
    </div>
  );
};

export default Hotel;
