/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, dropdown */

'use strict';

import Model from '/ckeditor5/ui/model.js';
import ListDropdown from '/ckeditor5/ui/dropdown/list/listdropdown.js';
import ListDropdownView from '/ckeditor5/ui/dropdown/list/listdropdownview.js';

import List from '/ckeditor5/ui/list/list.js';
import ListView from '/ckeditor5/ui/list/listview.js';

describe( 'ListDropdown', () => {
	let model, content, view, dropdown;

	beforeEach( () => {
		content = new Model();

		model = new Model( {
			isEnabled: true,
			isOn: false,
			content: content,
			label: 'foo'
		} );

		view = new ListDropdownView();
		dropdown = new ListDropdown( model, view );
	} );

	describe( 'constructor', () => {
		it( 'binds view#model attributes to the Button#model', () => {
			expect( view.model.isOn ).to.equal( model.isOn );
		} );

		it( 'adds a list to the panel', () => {
			const contentCollection = dropdown.panel.collections.get( 'content' );

			expect( contentCollection ).to.have.length( 1 );

			expect( contentCollection.get( 0 ) ).to.be.instanceof( List );
			expect( contentCollection.get( 0 ).view ).to.be.instanceof( ListView );
			expect( contentCollection.get( 0 ).model ).to.equal( content );
		} );

		it( 'attaches listener on model.content#execute and changes model#isOn', () => {
			model.isOn = true;

			content.fire( 'execute' );
			expect( model.isOn ).to.be.false;

			content.fire( 'execute' );
			expect( model.isOn ).to.be.false;
		} );
	} );
} );
