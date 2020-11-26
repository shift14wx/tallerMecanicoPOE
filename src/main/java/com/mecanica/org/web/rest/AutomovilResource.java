package com.mecanica.org.web.rest;

import com.mecanica.org.domain.Automovil;
import com.mecanica.org.repository.AutomovilRepository;
import com.mecanica.org.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mecanica.org.domain.Automovil}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AutomovilResource {

    private final Logger log = LoggerFactory.getLogger(AutomovilResource.class);

    private static final String ENTITY_NAME = "automovil";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AutomovilRepository automovilRepository;

    public AutomovilResource(AutomovilRepository automovilRepository) {
        this.automovilRepository = automovilRepository;
    }

    /**
     * {@code POST  /automovils} : Create a new automovil.
     *
     * @param automovil the automovil to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new automovil, or with status {@code 400 (Bad Request)} if the automovil has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/automovils")
    public ResponseEntity<Automovil> createAutomovil(@RequestBody Automovil automovil) throws URISyntaxException {
        log.debug("REST request to save Automovil : {}", automovil);
        if (automovil.getId() != null) {
            throw new BadRequestAlertException("A new automovil cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Automovil result = automovilRepository.save(automovil);
        return ResponseEntity.created(new URI("/api/automovils/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /automovils} : Updates an existing automovil.
     *
     * @param automovil the automovil to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated automovil,
     * or with status {@code 400 (Bad Request)} if the automovil is not valid,
     * or with status {@code 500 (Internal Server Error)} if the automovil couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/automovils")
    public ResponseEntity<Automovil> updateAutomovil(@RequestBody Automovil automovil) throws URISyntaxException {
        log.debug("REST request to update Automovil : {}", automovil);
        if (automovil.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Automovil result = automovilRepository.save(automovil);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, automovil.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /automovils} : get all the automovils.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of automovils in body.
     */
    @GetMapping("/automovils")
    public List<Automovil> getAllAutomovils() {
        log.debug("REST request to get all Automovils");
        return automovilRepository.findAll();
    }

    /**
     * {@code GET  /automovils/:id} : get the "id" automovil.
     *
     * @param id the id of the automovil to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the automovil, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/automovils/{id}")
    public ResponseEntity<Automovil> getAutomovil(@PathVariable Long id) {
        log.debug("REST request to get Automovil : {}", id);
        Optional<Automovil> automovil = automovilRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(automovil);
    }

    /**
     * {@code DELETE  /automovils/:id} : delete the "id" automovil.
     *
     * @param id the id of the automovil to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/automovils/{id}")
    public ResponseEntity<Void> deleteAutomovil(@PathVariable Long id) {
        log.debug("REST request to delete Automovil : {}", id);
        automovilRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
