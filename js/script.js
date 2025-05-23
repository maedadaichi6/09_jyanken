$(function () {
  let isReady = false;

  const hands = [
    { name: 'グー', src: 'img/gu.jpg' },
    { name: 'チョキ', src: 'img/cho.jpg' },
    { name: 'パー', src: 'img/pa.jpg' }
  ];

  // スタートボタンの動作
  $('#start-button').on('click', function () {
    $('#start-screen').fadeOut(500, function () {
      $('#main-game').fadeIn(500);
      playChantSequence(); // 演出スタート
    });
  });

  // 掛け声演出
  function playChantSequence(callback) {
    $('#jan, #ken, #pon').hide();
    isReady = false;

    $('#jan').fadeIn(200);
    setTimeout(() => {
      $('#jan').fadeOut(200, () => {
        $('#ken').fadeIn(200);
      });

      setTimeout(() => {
        $('#ken').fadeOut(200, () => {
          $('#pon').fadeIn(200);
          isReady = true;
          if (typeof callback === 'function') callback();
        });
      }, 1000);
    }, 1000);
  }

  // プレイヤーの手をクリックしたとき
  $('.hand').on('click', function () {
    if (!isReady) return;
    isReady = false;

    const playerChoice = $(this).data('choice');
    const playerImgSrc = $(this).attr('src');
    const computer = hands[Math.floor(Math.random() * hands.length)];
    const computerChoice = computer.name;
    const computerImgSrc = computer.src;

    $('#player-hand, #computer-hand').empty();
    $('#outcome').hide();
    $('#victory-image, #defeat-image, #draw-image').remove();

    // あなたの手を即時表示
    $('#player-hand').html(`<img src="${playerImgSrc}" alt="${playerChoice}" class="result-img">`);

    // 1秒後にコンピューターの手を表示
    setTimeout(() => {
      $('#computer-hand').html(`<img src="${computerImgSrc}" alt="${computerChoice}" class="result-img">`);
    }, 1000);

    // 2秒後に結果を表示
    setTimeout(() => {
      let result = '';
      let resultHTML = '';

      if (playerChoice === computerChoice) {
        result = 'あいこ！';
        resultHTML = `<img id="draw-image" src="img/aiko.png" alt="あいこ" class="result-img big">`;
      } else if (
        (playerChoice === 'グー' && computerChoice === 'チョキ') ||
        (playerChoice === 'チョキ' && computerChoice === 'パー') ||
        (playerChoice === 'パー' && computerChoice === 'グー')
      ) {
        result = 'あなたの勝ち！';
        resultHTML = `<img id="victory-image" src="img/kati.jpg" alt="勝ち" class="result-img big">`;
      } else {
        result = 'あなたの負け！';
        resultHTML = `<img id="defeat-image" src="img/make.jpg" alt="負け" class="result-img big">`;
      }

      $('#outcome').text(`結果：${result}`).fadeIn(200);
      $('#outcome').after(resultHTML);

      // 3秒後に演出と画面をリセット
      setTimeout(() => {
        $('#player-hand, #computer-hand').empty();
        $('#outcome').hide();
        $('#victory-image, #defeat-image, #draw-image').remove();
        $('#pon').fadeOut(100, () => {
          playChantSequence();
        });
      }, 3000);
    }, 2000);
  });
});
