// const {assert} = require('chai')

describe('Deneme Testi', function() {
  
    it('Test case 2', async function () {
        // expect(3).toBe(4)
        
        const button = UILib.makeButton()
        document.body.append(button)
        
        let img1 = await html2canvas(button)

        let img2 = new Image()
        img2.src = 'base/specs/index.t1.png'
        img2.onload = function () {
            
            if (img2.width !== img1.width || img2.height !== img1.height) {
                throw new Error('Image sizes don\'t match')
            } 
            
            const w = img2.width
            const h = img2.height
            const canvas = document.createElement('canvas')
            canvas.width = img2.width
            canvas.height = img2.height
            const context = canvas.getContext('2d')
            context.drawImage(img2, 0,0, w, h)
            const idata1 = img1.getContext('2d').getImageData(0,0 , w, h)
            const idata2 = context.getImageData(0,0 , w, h)
            const diff = new Uint8ClampedArray(w*h*4)
            const a = pixelmatch(idata1.data, idata2.data, diff, w, h, {threshold: 0.2});
            expect(a).toBeLessThan(10)
        }
        
    })

})