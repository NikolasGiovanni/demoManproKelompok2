/// Cara JQuery dan ajax

// $(".search-button").on("click", function () {
//   $.ajax({
//     url: "http://www.omdbapi.com/?apikey=3b4e80f3&s=" + $(".input-keyword").val(),
//     success: (results) => {
//       const movies = results.Search;
//       let cards = "";
//       movies.forEach((m) => {
//         cards += createCard(m);
//       });
//       $(".movie-container").html(cards);

//       // ketika tombol detail di click
//       $(".modal-detail-button").on("click", function () {
//         $.ajax({
//           url: "http://www.omdbapi.com/?apikey=3b4e80f3&i=" + $(this).data("imdbid"),
//           success: (m) => {
//             const movieDetails = Details(m);
//             $(".modal-body").html(movieDetails);
//           },
//           error: (e) => {
//             console.log(e.responseText);
//           },
//         });
//       });
//     },
//     error: (e) => {
//       console.log(e.responseText);
//     },
//   });
// });

/// Dengan cara fetch

// const searchButton = document.querySelector(".search-button");
// searchButton.addEventListener("click", function () {
//   const inputKeyword = document.querySelector(".input-keyword");
//   fetch("http://www.omdbapi.com/?apikey=3b4e80f3&s=" + inputKeyword.value)
//     .then((response) => response.json())
//     .then((response) => {
//       const movies = response.Search;
//       let cards = "";
//       movies.forEach((m) => (cards += createCard(m)));
//       const movieContainer = document.querySelector(".movie-container");
//       movieContainer.innerHTML = cards;

//       const modalButton = document.querySelectorAll(".modal-detail-button");
//       modalButton.forEach((m) => {
//         m.addEventListener("click", function () {
//           const imdbid = m.dataset.imdbid;
//           fetch("http://www.omdbapi.com/?apikey=3b4e80f3&i=" + imdbid)
//             .then((response) => response.json())
//             .then((response) => {
//               const modalBody = document.querySelector(".modal-body");
//               const movieDetails = Details(response);
//               modalBody.innerHTML = movieDetails;
//             });
//         });
//       });
//     });
// });

/// Fetch dengan async dan await (Refactor)
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
  try {
    const inputKeyword = document.querySelector(".input-keyword");
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);
  } catch (error) {
    alert(error);
  }
});

/// Event Binding
//// Menggunakan Event Binding karna modal-button akan muncul setelah search-button
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail-button")) {
    try {
      const imdbid = e.target.dataset.imdbid;
      const movieDetail = await getMovieDetail(imdbid);
      updateUIDetail(movieDetail);
    } catch (err) {
      alert(err);
    }
  }
});

function getMovies(keyword) {
  return fetch("http://www.omdbapi.com/?apikey=3b4e80f3&s=" + keyword)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      if (response.Response === "False") throw new Error("Movie Not Found ");
      return response.Search;
    });
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((m) => (cards += createCard(m)));
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}

function getMovieDetail(id) {
  return fetch("http://www.omdbapi.com/?apikey=3b4e80f3&i=" + id)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      if (response.Response !== "True") {
        throw new Error("Movie Detail its not found");
      }
      return response;
    });
}

function updateUIDetail(obj) {
  const modalBody = document.querySelector(".modal-body");
  const movieDetails = Details(obj);
  modalBody.innerHTML = movieDetails;
}

function createCard(m) {
  return `<div class="col-md-4 my-3">
  <div class="card" ">
    <img src="${m.Poster}" class="card-img-top" />
    <div class="card-body ">
      <h5 class="card-title">${m.Title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>              
      <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#buttonMovieDetail" data-imdbid=${m.imdbID}>Show Details</a>
    </div>
  </div>
</div>`;
}

function Details(m) {
  return `<div class="container-fluid">
  <div class="row">
    <div class="col-md-3">
      <img src="${m.Poster}" class="img-fluid">
    </div>
    <div class="col-md">
      <ul class="list-group">
        <li class="list-group-item"><h3>${m.Title} (${m.Year})</h3></li>
        <li class="list-group-item"><strong>Released : </strong>${m.Released}</li>
        <li class="list-group-item"><strong>Genre : </strong>${m.Genre}</li>
        <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
        <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
        <li class="list-group-item"><strong>Plot : </strong>${m.Plot}</li>
      </ul>
    </div>
  </div>
</div>`;
}

function createAlert(Error) {
  return `<div class="alert alert-danger d-flex align-items-center" role="alert">
  <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
  <div>
    <p>${Error}</p> 
  </div>
</div>`;
}