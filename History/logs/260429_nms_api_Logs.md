# /home/administrator/Service/nms-backend/venv/bin/uvicorn nms_api:app --host 0.0.0.0 --port 8001 로그
Traceback (most recent call last):

  File "/home/administrator/Service/nms-backend/venv/bin/uvicorn", line 6, in <module>

    sys.exit(main())

             ~~~~^^

  File "/home/administrator/Service/nms-backend/venv/lib/python3.13/site-packages/click/core.py", line 1514, in __call__

    return self.main(*args, **kwargs)

           ~~~~~~~~~^^^^^^^^^^^^^^^^^

  File "/home/administrator/Service/nms-backend/venv/lib/python3.13/site-packages/click/core.py", line 1435, in main

    rv = self.invoke(ctx)

  File "/home/administrator/Service/nms-backend/venv/lib/python3.13/site-packages/click/core.py", line 1298, in invoke

    return ctx.invoke(self.callback, **ctx.params)

           ~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  File "/home/administrator/Service/nms-backend/venv/lib/python3.13/site-packages/click/core.py", line 853, in invoke

    return callback(*args, **kwargs)

  File "/home/administrator/Service/nms-backend/venv/lib/python3.13/site-packages/uvicorn/main.py", line 441, in main

    run(

    ~~~^

        app,

        ^^^^

    ...<48 lines>...

        reset_contextvars=reset_contextvars,

        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    )

    ^

  File "/home/administrator/Service/nms-backend/venv/lib/python3.13/site-packages/uvicorn/main.py", line 617, in run

    server.run()

    ~~~~~~~~~~^^

  File "/home/administrator/Service/nms-backend/venv/lib/python3.13/site-packages/uvicorn/server.py", line 75, in run

    return asyncio_run(self.serve(sockets=sockets), loop_factory=self.config.get_loop_factory())

  File "/usr/lib/python3.13/asyncio/runners.py", line 195, in run

    return runner.run(main)

           ~~~~~~~~~~^^^^^^

  File "/usr/lib/python3.13/asyncio/runners.py", line 118, in run

    return self._loop.run_until_complete(task)

           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^^

  File "uvloop/loop.pyx", line 1518, in uvloop.loop.Loop.run_until_complete

  File "/home/administrator/Service/nms-backend/venv/lib/python3.13/site-packages/uvicorn/server.py", line 79, in serve

    await self._serve(sockets)

  File "/home/administrator/Service/nms-backend/venv/lib/python3.13/site-packages/uvicorn/server.py", line 86, in _serve

    config.load()

    ~~~~~~~~~~~^^

  File "/home/administrator/Service/nms-backend/venv/lib/python3.13/site-packages/uvicorn/config.py", line 449, in load

    self.loaded_app = import_from_string(self.app)

                      ~~~~~~~~~~~~~~~~~~^^^^^^^^^^

  File "/home/administrator/Service/nms-backend/venv/lib/python3.13/site-packages/uvicorn/importer.py", line 19, in import_from_string

    module = importlib.import_module(module_str)

  File "/usr/lib/python3.13/importlib/__init__.py", line 88, in import_module

    return _bootstrap._gcd_import(name[level:], package, level)

           ~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  File "<frozen importlib._bootstrap>", line 1387, in _gcd_import

  File "<frozen importlib._bootstrap>", line 1360, in _find_and_load

  File "<frozen importlib._bootstrap>", line 1331, in _find_and_load_unlocked

  File "<frozen importlib._bootstrap>", line 935, in _load_unlocked

  File "<frozen importlib._bootstrap_external>", line 1026, in exec_module

  File "<frozen importlib._bootstrap>", line 488, in _call_with_frames_removed

  File "/home/administrator/Service/nms-backend/nms_api.py", line 5, in <module>

    import models, service

  File "/home/administrator/Service/nms-backend/service.py", line 1, in <module>

    import pandas as pd

  File "/home/administrator/Service/nms-backend/venv/lib/python3.13/site-packages/pandas/__init__.py", line 11, in <module>

    __import__(_dependency)

    ~~~~~~~~~~^^^^^^^^^^^^^

  File "/home/administrator/Service/nms-backend/venv/lib/python3.13/site-packages/numpy/__init__.py", line 112, in <module>

    from numpy.__config__ import show_config

  File "/home/administrator/Service/nms-backend/venv/lib/python3.13/site-packages/numpy/__config__.py", line 4, in <module>

    from numpy._core._multiarray_umath import (

    ...<3 lines>...

    )

  File "/home/administrator/Service/nms-backend/venv/lib/python3.13/site-packages/numpy/_core/__init__.py", line 24, in <module>

    from . import multiarray

  File "/home/administrator/Service/nms-backend/venv/lib/python3.13/site-packages/numpy/_core/multiarray.py", line 11, in <module>

    from . import _multiarray_umath, overrides

RuntimeError: NumPy was built with baseline optimizations: 

(X86_V2) but your machine doesn't support:

(X86_V2).