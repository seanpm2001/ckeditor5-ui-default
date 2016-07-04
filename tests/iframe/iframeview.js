/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, iframe */

'use strict';

import Iframe from '/ckeditor5/ui/iframe/iframe.js';
import IframeView from '/ckeditor5/ui/iframe/iframeview.js';
import Model from '/ckeditor5/ui/model.js';

describe( 'IframeView', () => {
	let model, view;

	beforeEach( () => {
		model = new Model();
		view = new IframeView();

		document.body.appendChild( view.element );

		return new Iframe( model, view ).init();
	} );

	describe( 'constructor', () => {
		it( 'creates view element from the template', () => {
			expect( view.element.classList.contains( 'ck-reset-all' ) ).to.be.true;
			expect( view.element.attributes.getNamedItem( 'sandbox' ).value ).to.equal( 'allow-same-origin allow-scripts' );
		} );
	} );

	describe( 'init', () => {
		it( 'returns promise', () => {
			view = new IframeView();

			expect( view.init() ).to.be.an.instanceof( Promise );
		} );

		it( 'returns promise which is resolved when iframe finished loading', () => {
			view = new IframeView();

			const promise = view.init().then( () => {
				expect( view.element.contentDocument.readyState ).to.equal( 'complete' );
			} );

			// Moving iframe into DOM trigger creation of a document inside iframe.
			document.body.appendChild( view.element );

			return promise;
		} );
	} );

	describe( 'loaded event', () => {
		it( 'is fired when frame finished loading', ( done ) => {
			view = new IframeView();

			view.model.on( 'loaded', () => {
				done();
			} );

			view.init();

			// Moving iframe into DOM trigger creation of a document inside iframe.
			document.body.appendChild( view.element );
		} );
	} );
} );
