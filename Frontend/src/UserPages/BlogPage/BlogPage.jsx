import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { Pagination } from "react-bootstrap";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./BlogPage.css";  // Import CSS

import bannerImage from '../../assets/BannerHomePage.jpg';

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4); 

  useEffect(() => {
    fetchBlogPosts();
  }, [currentPage]);

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch(
        "https://6673f53a75872d0e0a947ec9.mockapi.io/api/v1/Blog"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setBlogPosts(data);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    }
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
   
    <div className="main-container" >
     <Header/>

      <div className="hero-wrap hero-bread mt-4" style={{
        backgroundImage: `url('https://tse2.mm.bing.net/th?id=OIP.J8x2ZXoCWJvX4S5zMjJWFgHaCO&pid=Api&P=0&h=220')`,
      }}>
        <div className="container">
          <div className="row no-gutters slider-text align-items-center justify-content-center">
            <div className="col-md-9 ftco-animate text-center">
              <p className="breadcrumbs">
                <span className="mr-2"><Link to="/SWP391-PodSystemBooking/">Home</Link></span>
                <span>Blog</span>
              </p>
              <h1 className="mb-0 bread">Blog</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4 ">
        <div className="row">
          {currentPosts.map((post) => (
            <div className="col-md-12 mb-4" key={post.id}>
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img src={post.Img} alt={post.Title} className="img-fluid mb-3" />
                </div>
                <div className="col-md-8">
                  <div className="blog-post">
                    <h2>{post.Title}</h2>
                    <p>{post.ShortDes}</p>
                    <p>
                      <Link to={`/SWP391-MomAndBaby/detailBlog/${post.id}`} className="btn btn-primary">
                        Read more
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Pagination>
          <Pagination.First onClick={() => paginate(1)} />
          <Pagination.Prev onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)} />
          {[...Array(Math.ceil(blogPosts.length / postsPerPage)).keys()].map((number) => (
            <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
              {number + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => paginate(currentPage < Math.ceil(blogPosts.length / postsPerPage) ? currentPage + 1 : Math.ceil(blogPosts.length / postsPerPage))} />
          <Pagination.Last onClick={() => paginate(Math.ceil(blogPosts.length / postsPerPage))} />
        </Pagination>
      </div>

      <div className="messenger-btn">
        <a href="https://m.me/343721882163379" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebookMessenger} style={{ marginRight: "10px" }} />
          Chat
        </a>
      </div>
    
      <Footer/>
    </div>
  
  );
}
