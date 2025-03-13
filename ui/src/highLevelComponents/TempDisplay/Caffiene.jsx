import HotPink from '../../images/hot_pink.png'
import ColdPink from '../../images/cold_pink.png'
import HotBlack from '../../images/hot_black.png'
import ColdBlack from '../../images/cold_black.png'

function Temp({temperature, color}) {
  return (
    <>
      {temperature == "hot" && color == "pink" &&
        <img src={HotPink} alt="hot" className="h-6"/>
      }
      {temperature == "cold" && color == "pink" &&
        <img src={ColdPink} alt="cold" className="h-6"/>
      }
      {temperature == "hot" && color == "black" &&
        <img src={HotBlack} alt="hot" className="w-4 pb-1"/>
      }
      {temperature == "cold" && color == "black" &&
        <img src={ColdBlack} alt="cold" className="w-4 pb-1"/>
      }
    </>
  );
}

export default Temp;