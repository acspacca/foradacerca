
(function(){
    const img = document.getElementById('paletteImage');
    // safe-guard if image not available
    function applyColors(rgb){
      const [r,g,b] = rgb;
      const luminance = (0.2126*r + 0.7152*g + 0.0722*b) / 255;
      const text = luminance > 0.6 ? '#111' : '#fff';

      document.documentElement.style.setProperty('--bg1', `rgb(${Math.round(r*0.48)}, ${Math.round(g*0.42)}, ${Math.round(b*0.38)})`);
      document.documentElement.style.setProperty('--bg2', `rgb(${Math.round(r*0.95)}, ${Math.round(g*0.85)}, ${Math.round(b*0.75)})`);
      document.documentElement.style.setProperty('--accent', `rgb(${r}, ${g}, ${b})`);
      document.documentElement.style.setProperty('--text', text);
      document.documentElement.style.setProperty('--r', r);
      document.documentElement.style.setProperty('--g', g);
      document.documentElement.style.setProperty('--b', b);

      document.body.classList.remove('no-js');
      document.body.classList.add('image-sampled');
    }

    function sampleImage(){
      try{
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const w = 80;
        const h = Math.max(1, Math.round(img.naturalHeight * (w / img.naturalWidth)));
        canvas.width = w; canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);
        const data = ctx.getImageData(0, 0, w, h).data;
        let r=0,g=0,b=0,count=0;
        for(let i=0;i<data.length;i+=4){
          const a = data[i+3];
          if(a === 0) continue;
          r += data[i]; g += data[i+1]; b += data[i+2]; count++;
        }
        if(count === 0) { applyColors([48,34,21]); return; }
        applyColors([Math.round(r/count), Math.round(g/count), Math.round(b/count)]);
      }catch(e){
        // fallback
        applyColors([48,34,21]);
      }
    }

    if(img.complete && img.naturalWidth){ sampleImage(); }
    else{
      img.addEventListener('load', sampleImage);
      img.addEventListener('error', ()=>{ applyColors([48,34,21]); });
    }
  })();
  