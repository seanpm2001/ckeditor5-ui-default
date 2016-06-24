/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* bender-tags: ui, toolbar */

'use strict';

import Toolbar from '/ckeditor5/ui/toolbar/toolbar.js';
import ToolbarView from '/ckeditor5/ui/toolbar/toolbarview.js';
import ControllerCollection from '/ckeditor5/ui/controllercollection.js';

describe( 'Toolbar', () => {
	let toolbar;

	beforeEach( () => {
		toolbar = new Toolbar( new ToolbarView() );
	} );

	describe( 'constructor', () => {
		it( 'creates buttons collection', () => {
			expect( toolbar.collections.get( 'buttons' ) ).to.be.instanceof( ControllerCollection );
		} );
	} );
} );
