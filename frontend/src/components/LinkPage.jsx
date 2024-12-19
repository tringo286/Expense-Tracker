import { Link } from "react-router-dom";

const LinkPage = () => {
  return (
    <section class="flex flex-col items-center justify-center text-center p-8 space-y-6">
    <h1 class="text-4xl font-bold">Links</h1>

    <div class="space-y-4">
        <h2 class="text-3xl font-semibold">Public</h2>
        <div class="space-y-4">  
            <Link to="/login" class="text-blue-500 hover:underline cursor-pointer text-xl block">Login</Link>
            <Link to="/register" class="text-blue-500 hover:underline cursor-pointer text-xl block">Register</Link>
        </div>
    </div>

    <div class="space-y-4">
        <h2 class="text-3xl font-semibold">Private</h2>
        <div class="space-y-4"> 
            <Link to="/" class="text-blue-500 hover:underline cursor-pointer text-xl block">Home</Link>
            <Link to="/editor" class="text-blue-500 hover:underline cursor-pointer text-xl block">Editors Page</Link>
            <Link to="/admin" class="text-blue-500 hover:underline cursor-pointer text-xl block">Admin Page</Link>
        </div>
    </div>
</section>

  )
}

export default LinkPage
