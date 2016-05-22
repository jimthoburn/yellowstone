
  var figure = document.querySelector('figure');
  var audio = document.querySelector('audio');

  var temperatureLabel = document.querySelector('.temperature span');

  var errupting = false;
  var temperature = 0;

  function errupt() {
    if (errupting) return;

    // Show the steam animation
    if (figure.className.indexOf('active') < 0) figure.className += ' active';

    // Play audio
   	audio.play();

    // Stop the erruption after a delay
    setTimeout(resetTemperature, 30000); // 30 seconds

    errupting = true;
  }

  function stopErruption() {
    if (!errupting) return;

  	// Stop the animation
    figure.className = figure.className.replace(/active/g, '');

    // Stop the audio
    audio.pause();

    errupting = false;
  }

  function isBoiling() {
    return temperature >= 285;
  }

  function increaseTemperature(degrees) {
    if (!degrees) degrees = 1;
    console.log('increasing temperature by: ' + degrees + ' degrees');
    temperature += degrees;
    temperatureLabel.innerHTML = temperature;
    console.log('temperature is now: ' + temperature + ' degrees');
  }

  function resetTemperature() {
    temperature = 200;
    temperatureLabel.innerHTML = temperature;
  }

  // At a random interval between 35 and 91 minutes, errupt automatically.
  resetTemperature();
  setInterval(function() {
    increaseTemperature();
    if (isBoiling()) {
      errupt();
    } else {
      stopErruption();
    }
  }, 1000); // 1 second

  // If the user presses the tunnel, the rocks, or the magma, increase the temperature by ten degrees.
  figure.addEventListener('click', function() {
    increaseTemperature(10)
  }, false);

