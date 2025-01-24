import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { QuestionCircleFill } from 'react-bootstrap-icons'

const NumberTooltip = () => (
  <OverlayTrigger
    overlay={
      <Tooltip id='number-tooltip' className='number-tooltip'>
        The number must follow this format: <br />
        &lt;2–3 digits&gt;–&lt;7–8 digits&gt;
      </Tooltip>
    }
    test='Example text'
  >
    <QuestionCircleFill className='text-primary' tabIndex={0} />
  </OverlayTrigger>
)

export default NumberTooltip
