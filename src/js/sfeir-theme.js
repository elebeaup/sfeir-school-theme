
class SfeirTheme {
	constructor(){
		document.addEventListener('DOMContentLoaded', () => setTimeout(this._pageload.bind(this), 500));
		this.path = "";
	}

	_pageload(){
		this.path = this._extractPath();

		// FavIcon
		this._manageFavIcon();

		// ManageBackground
		this._manageBackgrounds();

		// ManageShowContent
		this._manageShowTypeContent();

		// ManageSpecificsColumnsSlides
		this._manageSpecificsColumnsSlides();
		
		if (Reveal){
			Reveal.sync();
		}
		

	}
	_extractPath(){
		const scripts = document.getElementsByTagName("script");

		for(let idx = 0; idx < scripts.length; idx++)
		{
		  const script = scripts.item(idx);

		  if(script.src && script.src.match(/sfeir-theme\.js$/))
		  {
			const path = script.src;
			return path.substring(0, path.indexOf('js/sfeir-theme'));
		  }
		}
	  return "";
	};

	_manageFavIcon(){
		const link = document.createElement('link');
		link.type = 'image/x-icon';
		link.rel = 'shortcut icon';
		link.href = `${this.path}images/logo_sfeir_burger.png`;
		document.getElementsByTagName('head')[0].appendChild(link);

	}

	_manageBackgrounds(){

		const map = {
			'first-slide': `${this.path}images/bg-grey-axololt.png`,
			'transition': `${this.path}images/bg-grey-axololt.png`,
			'school-presentation': `${this.path}images/bg-school.png`,
			'speaker-slide': `${this.path}images/bg-grey-axololt.png`,
			'sfeir-slide': `${this.path}images/bg-grey-axololt.png`,
			'bg-white': `${this.path}images/bg-grey-8.png`,
			'bg-pink': `${this.path}images/bg-grey-8.png`,
			'bg-blue': `${this.path}images/bg-grey-8.png`,
			'bg-green': `${this.path}images/bg-grey-8.png`,
			'sfeir-bg-axololt': `${this.path}images/bg-grey-axololt.png`,
			'sfeir-bg-grey-1': `${this.path}images/bg-grey-1.png`,
			'sfeir-bg-grey-2': `${this.path}images/bg-grey-2.png`,
			'sfeir-bg-grey-3': `${this.path}images/bg-grey-3.jpg`,
			'sfeir-bg-grey-4': `${this.path}images/bg-grey-4.jpg`,
			'sfeir-bg-grey-5': `${this.path}images/bg-grey-5.jpg`,
			'sfeir-bg-grey-6': `${this.path}images/bg-grey-6.jpg`,
			'sfeir-bg-grey-7': `${this.path}images/bg-grey-7.jpg`,
			'sfeir-bg-grey-8': `${this.path}images/bg-grey-8.png`,
		};

		for (let key in map){
			const queryElementList = document.querySelectorAll('.reveal .slides section:not([data-background]).'+key);

			for (let i = 0; i < queryElementList.length; i++){
				const element = queryElementList[i];
				element.classList.add('sfeir-specific-slide');			
				element.setAttribute('data-background',map[key]);
			}
		}

		// Add default background for slides 
		const genericsSlides = [...document.querySelectorAll('.reveal .slides section:not([data-background]):not(.sfeir-specific-slide):not(.no-background):not(.with-code-dark)')];
		for (let genericSlide of genericsSlides){
			genericSlide.classList.add('sfeir-basic-slide');
		}

		this._manageFirstSlide();
	}

	_manageFirstSlide(){
		const firstSlides = [...document.querySelectorAll('.reveal .slides section.first-slide')];
		for (let firstSlideSection of firstSlides){
			const imgLogo = document.createElement('DIV');
			imgLogo.classList.add("sfeir-logo");
			imgLogo.style['background-image'] = `url(${this.path}images/logo_empty.png)`;

			const level = firstSlideSection.hasAttribute('sfeir-level') ? +firstSlideSection.getAttribute('sfeir-level') : 1;
			const techno = firstSlideSection.hasAttribute('sfeir-techno') ? firstSlideSection.getAttribute('sfeir-techno') : '';
			imgLogo.setAttribute('data-sfeir-level', level);
			imgLogo.setAttribute('data-sfeir-techno', techno);

			firstSlideSection.insertAdjacentElement('afterbegin', imgLogo);

		}
	}

	_manageShowTypeContent(){

		const showTypeContent = document.querySelector('.reveal .slides').getAttribute('data-type-show');
		if (showTypeContent){
			const showTypeSlides = document.querySelectorAll('.reveal .slides section[data-type-show]');
			for (let i = 0; i < showTypeSlides.length; i++){
				const tmpSlide = showTypeSlides[i];
				if (tmpSlide.getAttribute('data-type-show') != showTypeContent){
					tmpSlide.parentNode.removeChild(tmpSlide);
				}
			}
		}
	}

	_manageSpecificsColumnsSlides(){

		const twoColSlides = [...document.querySelectorAll('.reveal .slides section.two-column-layout')];
		for (let twoColSection of twoColSlides){
			const parentSection = twoColSection.parentElement;
			parentSection.classList.add('two-column-layout');
			// Need to overrides reveal inlinestyles
			parentSection.style.display='grid';
			if (parentSection.nodeName === 'SECTION'){
				const subSections = [...parentSection.querySelectorAll('section')];
				for(let subSection of subSections){
					subSection.classList.remove('two-column-layout');
					subSection.style.display='block';
				}
			}
		}
		if (Reveal){
			// Need to overrides reveal inlinestyles
			Reveal.addEventListener('slidechanged', (event)=> {
				console.log(event);
				const currentSlide = event.currentSlide;
				const parentSlide = currentSlide.parentElement;
				if (parentSlide.nodeName === 'SECTION' 
					&& parentSlide.classList.contains('two-column-layout')){
						const state = Reveal.getState();
						state.indexv = 2;
						Reveal.setState(state);
						parentSlide.style.display='grid';
				}
			})
		}
	}

}


new SfeirTheme();
