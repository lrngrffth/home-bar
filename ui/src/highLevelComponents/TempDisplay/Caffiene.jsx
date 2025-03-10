import Hot from '../../images/hot.png'
import Cold from '../../images/cold.png'

function Temp({temperature}) {
  return (
    <>
      {temperature["name"] == "hot" &&
        <img src={Hot} alt="hot" className="h-6"/>
      }
      {temperature["name"] == "cold" &&
        <img src={Cold} alt="cold" className="h-6"/>
      }
    </>
  );
}

export default Temp;