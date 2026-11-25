const DEFAULT_URL = '/api/plugins/dockge/';

jQuery(() => {
    const html = `
        <div id="dockge-overlay" class="hidden">
            <div id="dockge-bar">
                <strong>Dockge</strong>
                <input id="dockge-url" type="text" value="${DEFAULT_URL}" />
                <button id="dockge-go" class="menu_button">Load</button>
                <button id="dockge-close" class="menu_button">Close</button>
            </div>
            <iframe id="dockge-frame" src="about:blank"></iframe>
        </div>
    `;
    $('body').append(html);

    // Add button to SillyTavern's top bar
    $('#top-settings-holder').append(`
        <div id="dockge-toggle" class="drawer-icon fa-solid fa-server fa-fw" title="Open Dockge"></div>
    `);

    $('#dockge-toggle').on('click', () => {
        $('#dockge-overlay').removeClass('hidden');
        const url = $('#dockge-url').val();
        if ($('#dockge-frame').attr('src') === 'about:blank') {
            $('#dockge-frame').attr('src', url);
        }
    });

    $('#dockge-go').on('click', () => {
        $('#dockge-frame').attr('src', $('#dockge-url').val());
    });

    $('#dockge-close').on('click', () => {
        $('#dockge-overlay').addClass('hidden');
    });
});
