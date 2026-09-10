import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Courses from '@/app/(marketing)/courses/page'
 
describe('Courses page', () => {
  it('renders a heading', () => {
    render(<Courses />);
 
    const heading = screen.getByRole('heading', { level: 1 });
 
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Courses');
  })
})