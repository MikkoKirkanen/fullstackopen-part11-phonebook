import { render, screen } from '@testing-library/react'
import Notification from '../src/components/Notification'

describe('Notification', () => {
  test('should show notification', () => {
    const notification = {
      type: 'success',
      message: 'Title',
      messages: ['first', 'second'],
    }

    const { container } = render(<Notification notification={notification} />)

    expect(container.querySelector('.alert-heading')).toHaveTextContent(
      notification.message
    )
    expect(screen.getByText('second')).toBeVisible()
  })
})
