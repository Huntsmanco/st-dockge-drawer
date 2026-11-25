const DEFAULT_URL = 'http://127.0.0.1:5001';

jQuery(() => {
    const html = `
        <div id="dockge-overlay" class="hidden">
            <div id="dockge-bar">
                <strong>Dockge</strong>
                <input id="dockge-url" type="text" value="${DEFAULT_URL}" />
                <button id="dockge-go" class="menu_button">Load Frame</button>
                <button id="dockge-probe" class="menu_button">Fetch Probe</button>
                <button id="dockge-tab" class="menu_button">New Tab</button>
                <button id="dockge-close" class="menu_button">Close</button>
            </div>
            <div id="dockge-status" style="padding: 6px 12px; background: #181818; color: #ff6b6b; font-family: monospace; font-size: 12px; border-bottom: 1px solid #333;">
                Ready — click Load Frame or Fetch Probe to see the raw browser error in DevTools (F12).
            </div>
            <iframe id="dockge-frame" src="about:blank"></iframe>
        </div>
    `;
    $('body').append(html);

    $('#top-settings-holder').append(`
        <div id="dockge-toggle" class="drawer-icon fa-solid fa-server fa-fw" title="Open Dockge"></div>
    `);

    const updateFrame = () => {
        const url = $('#dockge-url').val().trim();
        $('#dockge-status').text(`Loading iframe -> ${url} (check F12 Network tab for raw request)`);
        $('#dockge-frame').attr('src', url);
    };

    $('#dockge-toggle').on('click', () => {
        $('#dockge-overlay').removeClass('hidden');
        if ($('#dockge-frame').attr('src') === 'about:blank') {
            updateFrame();
        }
    });

    $('#dockge-go').on('click', updateFrame);

    $('#dockge-probe').on('click', async () => {
        const url = $('#dockge-url').val().trim();
        $('#dockge-status').text(`Probing ${url}...`);
        try {
            const res = await fetch(url, { mode: 'no-cors' });
            $('#dockge-status').text(`Response type: ${res.type} | Status: ${res.status} (Opaque means host answered!)`);
        } catch (err) {
            $('#dockge-status').text(`Failed: ${err.name} — ${err.message}`);
        }
    });

    $('#dockge-tab').on('click', () => {
        window.open($('#dockge-url').val().trim(), '_blank');
    });

    $('#dockge-close').on('click', () => {
        $('#dockge-overlay').addClass('hidden');
    });
});
