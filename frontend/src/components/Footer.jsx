const Footer = () => {
  const today = new Date();
  return (
    <footer className="Footer text-center">
      <p>Copyright &copy; {today.getFullYear()}</p>
    </footer>
  )
}

export default Footer