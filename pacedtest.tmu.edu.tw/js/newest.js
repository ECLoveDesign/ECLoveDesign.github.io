const tdSearchings = document.querySelectorAll('.table__seaching-selection--context .td__search')
	const tdSearchingsArr =  Array.prototype.slice.call(tdSearchings)


	tdSearchings.forEach( item => {
		item.addEventListener('click', e => {
			//toggle
			e.target.innerText = e.target.innerText === '查詢' ? '關閉' : '查詢'
			e.target.classList.toggle('unshow')

			// for focusd target
			const dataTab = e.target.closest('.table__seaching-selection--context').getAttribute("data-tab")
			const dataType = e.target.getAttribute("data-type")
			console.log(dataTab, dataType)
			
			// 綁定
			const tableSeachingFeedbacks = document.querySelectorAll(`.table__seaching-feedback[data-tab=${dataTab}]`)
			const tableSeachingFeedbacksArr =  Array.prototype.slice.call(tableSeachingFeedbacks)


			if(e.target.classList.contains('unshow')) {
				tableSeachingFeedbacksArr.map(el => el.classList.add('table--unshow'))
			}else {
				e.target.closest('.table__seaching-selection--context').querySelectorAll('.td__search')
				.forEach(item => {
					item.classList.add('unshow')
					item.innerText = '查詢'
				})

				tableSeachingFeedbacksArr.map(el => el.classList.add('table--unshow'))
				tableSeachingFeedbacksArr.find(el => el.getAttribute("data-type") === dataType).classList.remove('table--unshow')

				e.target.innerText = e.target.innerText === '查詢' ? '關閉' : '查詢'
				e.target.classList.toggle('unshow')
			}

		})
	})

	document.querySelector('.btn-close').addEventListener('click', e => {
		document.querySelectorAll('.td__search').forEach(item => {
			item.innerText = '查詢'
			item.classList.add('unshow')
		})
		document.querySelectorAll('.table__seaching-feedback').forEach(item => {
			item.classList.add('table--unshow')
		})
	})