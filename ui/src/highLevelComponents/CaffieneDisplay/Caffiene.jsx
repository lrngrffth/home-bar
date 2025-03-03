import Beans from '../../images/coffee-beans.png'

function Caffiene({caffieneLevel}) {
  return (
    <>
      {caffieneLevel == "low" &&
        <img src={Beans} alt="coffee beans" className="h-6"/>
      }
      {caffieneLevel == "medium" &&
        <div className='flex'>
          <img src={Beans} alt="coffee beans" className="h-6"/>
          <img src={Beans} alt="coffee beans" className="h-6"/>
        </div>
      }
      {caffieneLevel == "high" &&
        <div className='flex'>
          <img src={Beans} alt="coffee beans" className="h-6"/>
          <img src={Beans} alt="coffee beans" className="h-6"/>
          <img src={Beans} alt="coffee beans" className="h-6"/>
        </div>
      }
    </>
  );
}

export default Caffiene;