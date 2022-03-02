import  Blog  from './Blog'



function Home() {

    
    return (
        <main>
            <section>
                <div className="container-fluid">
                    <h1 className='text-light mb-5 text-center'>Bloggy!</h1>
                    <p className='text-light mb-5 text-center'>Welcome to Bloggy! Where elite bloggers blog about all the things worth blogging about today.</p>
                </div>
            </section>
                    <h4 className='text-light text-center'>Blogs</h4>
            <section className="row p-3 pt-1 w-100">
                    <Blog />
            </section>
        </main>
    );
}

export default Home;