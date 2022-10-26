const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const animationType = entry.target.dataset.scrollAnimation;

        var windowHeight = window.innerHeight;
        var elementTop =  entry.target.getBoundingClientRect().top;
        if (elementTop < windowHeight)
            entry.target.classList.add(animationType);
        else 
            entry.target.classList.remove(animationType);
    });
});

const targets = document.querySelectorAll('.js-show-on-scroll');
targets.forEach((element) =>
{
    element.classList.add('opacity-0');
    observer.observe(element);   
});