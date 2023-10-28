function removeHTMLTags(input) {
    return input.replace(/<\/?[^>]+(>|$)/g, "");
}

function fetchYogaPoses() {
    const loadingSpinner = document.getElementById("loading");
    loadingSpinner.style.display = "flex";
    const apiUrl = "https://brianatlarge.com/wp-json/jet-cct/yoga_poses_mvp3";

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            loadingSpinner.style.display = "none";
            const yogaPoses = data;
            const posesList = document.getElementById("poses-list");

            yogaPoses.forEach((pose, index) => {
                const poseCard = document.createElement("div");
                poseCard.classList.add("premium-card", "animate__animated", "animate__fadeIn", "animate__delay-1s");

                const poseImage = document.createElement("img");
                poseImage.src = pose.pose_image;
                poseImage.alt = pose.pose_name;

                const poseName = document.createElement("h2");
                poseName.textContent = pose.pose_name;

                const poseDescription = document.createElement("p");
                const shortDescription = removeHTMLTags(pose.notes.length > 100 ? pose.notes.slice(0, 100) + "..." : pose.notes);
                const fullDescription = removeHTMLTags(pose.notes);
                poseDescription.innerHTML = shortDescription;

                if (pose.notes.length > 100) {
                    const readMoreLink = document.createElement("span");
                    readMoreLink.textContent = "Read More";
                    readMoreLink.classList.add("read-more", "cursor-pointer", "text-blue-600", "font-bold");
                    let isExpanded = false;

                    readMoreLink.addEventListener("click", () => {
                        if (isExpanded) {
                            poseDescription.innerHTML = shortDescription;
                            readMoreLink.textContent = "Read More";
                        } else {
                            poseDescription.innerHTML = fullDescription;
                            readMoreLink.textContent = "Read Less";
                        }
                        isExpanded = !isExpanded;
                    });

                    poseDescription.appendChild(readMoreLink);
                }

                poseCard.appendChild(poseImage);
                poseCard.appendChild(poseName);
                posesList.appendChild(poseCard);
                poseCard.appendChild(poseDescription);

                /*const progressValue = ((index + 1) / yogaPoses.length) * 100;
                progress.style.width = `${progressValue}%`;*/
            });
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

fetchYogaPoses();
